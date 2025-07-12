const { MongoClient } = require('mongodb');
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

let cachedClient = null;
let cachedDB = null;

const mongoOptions = {
    maxPoolSize: 1,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    connectTimeoutMS: 2000
};


function getQueryParameters(event) {
    // First try the parsed version
    if (event.queryStringParameters) {
        return event.queryStringParameters;
    }

    // If not available, parse the raw query string
    if (event.rawQueryString) {
        const params = {};
        const pairs = event.rawQueryString.split('&');

        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            if (key) {
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            }
        }

        return params;
    }

    return {};
}

async function connectToDB() {
    if (cachedDB) {
        return cachedDB;
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is not set');
    }

    try {
        const client = new MongoClient(process.env.MONGO_URI, mongoOptions);
        await client.connect();

        cachedClient = client;
        cachedDB = client.db('form');

        return cachedDB;
    } catch (connectionError) {
        console.error('Database connection failed:', connectionError.message);
        throw connectionError;
    }
}
const createEmail = (data) => {
    return {
        Destination: {
            BccAddresses: [],
            CcAddresses: ["barberpressure@gmail.com"],
            ToAddresses: [data.email]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<h3>Hi, ${data.firstName}!</h3>
                    <p>We've received your quote request for our ${data.service} service, and we'll be in touch shortly! </p>
                    <p>📞 <a href="tel:+1214274-2762">(214) 274-2762</a></p>
                    <p>📧 <a href="mailto:barberpressure@gmail.com">barberpressure@gmail.com</a></p>`

                },
                Text: {
                    Charset: "UTF-8",
                    Data: `Hi, ${data.firstName}!\n We've received your quote request for our ${data.service} service, and we'll be in touch shortly!`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: `Your ${data.service} quote request has been received`
            }
        },
        ReplyToAddresses: ["barberpressure@gmail.com"],
        Source: "autoreply@barberpressure.com"
    };
};

const sendEmailSafely = async (emailParams) => {
    try {
        const result = await ses.sendEmail(emailParams).promise();
        console.log('Email sent successfully:', result.MessageId);
        return { success: true, messageId: result.MessageId };
    } catch (emailError) {
        console.error('Email sending failed:', emailError.message);

        // Log specific SES errors but don't fail the entire request
        if (emailError.code === 'MessageRejected') {
            console.error('Email was rejected - check recipient address');
        } else if (emailError.code === 'SendingPausedException') {
            console.error('SES sending is paused - check AWS console');
        }

        return { success: false, error: emailError.message };
    }
};

exports.handler = async (event) => {
    const httpMethod = event.requestContext?.http?.method || 'POST';
    const queryParams = getQueryParameters(event);


    try {
        const db = await connectToDB();
        const collection = db.collection('submissions');

        switch (httpMethod) {
            case 'GET':
                let mongoQuery = {};

                // Handle days parameter
                if (queryParams.days) {
                    const daysBack = parseInt(queryParams.days);
                    const cutoffDate = new Date();
                    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
                    mongoQuery.timestamp = { $gte: cutoffDate.toISOString() };
                }

                // Handle other filters
                if (queryParams.email) {
                    mongoQuery.email = queryParams.email;
                }

                // Handle pagination
                const limit = parseInt(queryParams.limit) || 50;
                const skip = parseInt(queryParams.skip) || 0;

                const results = await collection
                    .find(mongoQuery)
                    .sort({ timestamp: -1 })
                    .skip(skip)
                    .limit(limit)
                    .toArray();

                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        success: true,
                        data: results,
                        count: results.length
                    })
                };

            case 'POST':
                // Validate request body
                if (!event.body) {
                    return {
                        statusCode: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify({
                            error: 'Request body is missing'
                        })
                    };
                }

                let formData;
                try {
                    formData = JSON.parse(event.body);
                } catch (parseError) {
                    return {
                        statusCode: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify({
                            error: 'Invalid JSON in request body'
                        })
                    };
                }

                // Validate required fields
                if (!formData.email || !formData.firstName || !formData.service) {
                    return {
                        statusCode: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify({
                            error: 'Missing required fields: email, firstName, or service'
                        })
                    };
                }

                // Add timestamp
                if (!formData.timestamp) {
                    formData.timestamp = new Date().toISOString();
                }

                // Save to database first
                let insertResult;
                try {
                    insertResult = await collection.insertOne(formData);
                    console.log('Data saved to MongoDB:', insertResult.insertedId);
                } catch (dbError) {
                    console.error('Database save failed:', dbError.message);
                    return {
                        statusCode: 500,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify({
                            error: 'Failed to save form data'
                        })
                    };
                }

                // Send email (don't fail the request if email fails)
                const emailParams = createEmail(formData);
                const emailResult = await sendEmailSafely(emailParams);

                if (!emailResult.success) {
                    console.warn('Email failed but form was saved:', emailResult.error);
                }

                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        success: true,
                        id: insertResult.insertedId,
                        emailSent: emailResult.success,
                        ...(emailResult.success ? { emailId: emailResult.messageId } : {})
                    })
                };

            default:
                return {
                    statusCode: 405,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        error: 'Method not allowed'
                    })
                };
        }
    } catch (error) {
        console.error('Lambda error:', error.message);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};