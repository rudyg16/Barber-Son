const { MongoClient } = require('mongodb');

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
    console.log('=== Database Connection Debug ===');
    console.log('Cached DB exists:', !!cachedDB);

    if (cachedDB) {
        console.log('Using cached database connection');
        return cachedDB;
    }

    console.log('Creating new database connection...');
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    console.log('MONGO_URI length:', process.env.MONGO_URI ? process.env.MONGO_URI.length : 0);

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is not set');
    }

    try {
        const client = new MongoClient(process.env.MONGO_URI, mongoOptions);
        console.log('MongoClient created, attempting to connect...');

        await client.connect();
        console.log('MongoDB connection successful');

        cachedClient = client;
        cachedDB = client.db('BarberAndSon');
        console.log('Database cached successfully');

        return cachedDB;
    } catch (connectionError) {
        console.error('Database connection failed:', {
            error: connectionError.message,
            code: connectionError.code,
            name: connectionError.name
        });
        throw connectionError;
    }
}

exports.handler = async (event) => {
    console.log('=== Lambda Handler Start ===');
    console.log('Event received:', JSON.stringify(event, null, 2));
    console.log('Event body:', event.body);

    // FIXED: Correct path for Lambda Function URL
    const httpMethod = event.requestContext?.http?.method || 'POST';
    console.log('HTTP Method:', httpMethod);

    // FIXED: Use the query parameter function
    const queryParams = getQueryParameters(event);
    console.log('Query Parameters:', queryParams);

    console.log('=== Environment Variables Check ===');
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('AWS_REGION:', process.env.AWS_REGION);

    try {
        console.log('=== Starting Database Connection ===');
        const db = await connectToDB();
        console.log('Database connection acquired');

        console.log('=== Getting Collection ===');
        const collection = db.collection('submissions');
        console.log('Collection acquired');

        console.log('Processing HTTP method:', httpMethod);

        switch (httpMethod) {
            case 'GET':
                console.log('=== Processing GET Request ===');
                console.log('Query parameters:', queryParams);

                let mongoQuery = {};
                console.log('Initial mongo query:', mongoQuery);

                // Handle days parameter
                if (queryParams.days) {
                    console.log('Processing days parameter:', queryParams.days);
                    const daysBack = parseInt(queryParams.days);
                    console.log('Days back (parsed):', daysBack);

                    const cutoffDate = new Date();
                    console.log('Current date:', cutoffDate);

                    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
                    console.log('Cutoff date:', cutoffDate);

                    mongoQuery.timestamp = { $gte: cutoffDate.toISOString() };
                    console.log('Updated mongo query with date filter:', mongoQuery);
                }

                // Handle other filters
                if (queryParams.email) {
                    console.log('Adding email filter:', queryParams.email);
                    mongoQuery.email = queryParams.email;
                }

                // Handle pagination
                const limit = parseInt(queryParams.limit) || 50;
                const skip = parseInt(queryParams.skip) || 0;
                console.log('Pagination - limit:', limit, 'skip:', skip);

                console.log('=== Executing Database Query ===');
                console.log('Final mongo query:', mongoQuery);

                const results = await collection
                    .find(mongoQuery)
                    .sort({ timestamp: -1 })
                    .skip(skip)
                    .limit(limit)
                    .toArray();

                console.log('Query results count:', results.length);
                console.log('First result (if any):', results[0] || 'No results');

                const getResponse = {
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

                console.log('=== GET Response Prepared ===');
                console.log('Response status:', getResponse.statusCode);
                return getResponse;

            case 'POST':
                console.log('=== Processing POST Request ===');
                console.log('Raw event body:', event.body);
                console.log('Event body type:', typeof event.body);

                if (!event.body) {
                    console.error('No body in POST request');
                    throw new Error('Request body is missing');
                }

                let formData;
                try {
                    formData = JSON.parse(event.body);
                    console.log('Parsed form data:', formData);
                    console.log('Form data keys:', Object.keys(formData));
                } catch (parseError) {
                    console.error('Failed to parse JSON body:', parseError.message);
                    throw new Error('Invalid JSON in request body');
                }

                // Add timestamp if not present
                if (!formData.timestamp) {
                    formData.timestamp = new Date().toISOString();
                    console.log('Added timestamp:', formData.timestamp);
                }

                console.log('=== Inserting into Database ===');
                console.log('Data to insert:', formData);

                const result = await collection.insertOne(formData);
                console.log('Insert result:', {
                    acknowledged: result.acknowledged,
                    insertedId: result.insertedId
                });

                const postResponse = {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        success: true,
                        id: result.insertedId
                    })
                };

                console.log('=== POST Response Prepared ===');
                console.log('Response status:', postResponse.statusCode);
                console.log('Response body:', postResponse.body);
                return postResponse;

            default:
                console.log('=== Unsupported HTTP Method ===');
                console.log('Method received:', httpMethod);
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
        console.error('=== Lambda Error ===');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Error code:', error.code);
        console.error('Full error object:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message,
                errorType: error.name
            })
        };
    }
};