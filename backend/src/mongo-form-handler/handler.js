const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDB = null;

const mongoOptions = {
    maxPoolSize: 1,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    bufferMaxEntries: 0,
    bufferCommands: false,
};

async function connectToDB() {
    if (cachedDB) {
        return cachedDB;
    }

    const client = new MongoClient(process.env.MONGO_URI, mongoOptions);
    await client.connect();

    cachedClient = client;
    cachedDB = client.db('BarberAndSon');

    return cachedDB;
}

exports.handler = async (event) => {
    try {
        const db = await connectToDB(); // Fixed function name
        const collection = db.collection('submissions');
        const httpMethod = event.httpMethod; // Added const/let

        switch (httpMethod) {
            case 'GET':
                const params = event.queryStringParameters || {};
                let mongoQuery = {}; // Better name than dateFilter

                // Handle days parameter
                if (params.days) {
                    const daysBack = parseInt(params.days);
                    const cutoffDate = new Date();
                    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
                    mongoQuery.timestamp = { $gte: cutoffDate.toISOString() }; // Fixed syntax
                }

                // Handle other filters
                if (params.email) {
                    mongoQuery.email = params.email;
                }

                // Handle pagination
                const limit = parseInt(params.limit) || 50;
                const skip = parseInt(params.skip) || 0;

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
                const formData = JSON.parse(event.body);
                const result = await collection.insertOne(formData);

                return {
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
        console.error('Lambda error:', error);
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