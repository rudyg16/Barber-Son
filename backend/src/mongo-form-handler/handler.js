const { MongoClient, ServerApiVersion } = require('mongodb');

// Use module-scoped variables for MongoClient and DB connection
// This allows Lambda to reuse the connection across warm invocations.
let cachedMongoClient = null;
let cachedDb = null;

// Function to connect to MongoDB
async function connectToMongoDB() {
    // Check if a cached connection exists and is still valid
    if (cachedDb && cachedMongoClient && cachedMongoClient.topology && cachedMongoClient.topology.isConnected()) {
        console.log('Using cached MongoDB connection.');
        return cachedDb;
    }

    console.log('Establishing new MongoDB connection...');
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        throw new Error("MONGO_URI environment variable is not set.");
    }

    // Log connection attempt (without exposing password)
    const maskedUri = MONGO_URI.replace(/:([^:@]+)@/, ':****@');
    console.log('Attempting to connect to:', maskedUri);

    try {
        cachedMongoClient = new MongoClient(MONGO_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            maxIdleTimeMS: 60000, // Close idle connections after 60 seconds
            maxPoolSize: 5,       // Max 5 connections in the pool
            serverSelectionTimeoutMS: 10000, // Increased to 10 seconds for better diagnostics
            connectTimeoutMS: 10000, // 10 seconds timeout for initial connection
        });

        console.log('MongoClient created, attempting connection...');
        await cachedMongoClient.connect();

        // Test the connection
        await cachedMongoClient.db("admin").command({ ping: 1 });
        console.log('MongoDB ping successful.');

        // Replace "BarberSonDB" with the actual name of your MongoDB database
        cachedDb = cachedMongoClient.db("BarberSonDB");
        console.log('MongoDB connected successfully to database: BarberSonDB');
        return cachedDb;
    } catch (error) {
        console.error("Detailed MongoDB connection error:", {
            name: error.name,
            message: error.message,
            code: error.code,
            codeName: error.codeName,
            stack: error.stack
        });

        // Provide more specific error messages
        if (error.name === 'MongoServerSelectionError') {
            console.error("Server selection failed. This usually indicates:");
            console.error("1. Network connectivity issues (check VPC/subnet configuration)");
            console.error("2. MongoDB Atlas IP whitelist doesn't include Lambda's IP");
            console.error("3. Incorrect connection string");
        } else if (error.name === 'MongoAuthenticationError') {
            console.error("Authentication failed. Check username/password in connection string.");
        } else if (error.name === 'MongoNetworkError') {
            console.error("Network error. Check VPC configuration and MongoDB Atlas network access.");
        }

        throw new Error(`Failed to connect to the database: ${error.message}`);
    }
}

// Lambda Handler
exports.handler = async (event) => {
    let dbClient;

    try {
        const httpMethod = event.httpMethod;
        const path = event.path;

        // Test endpoints that don't require database connection
        if (httpMethod === 'GET' && path === '/ip-check') {
            const https = require('https');

            return new Promise((resolve) => {
                https.get('https://api.ipify.org', (res) => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => {
                        resolve({
                            statusCode: 200,
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({
                                lambdaPublicIP: data.trim(),
                                timestamp: new Date().toISOString(),
                                message: "Add this IP to MongoDB Atlas Network Access"
                            }),
                        });
                    });
                }).on('error', (error) => {
                    resolve({
                        statusCode: 500,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({
                            error: "Failed to get public IP",
                            details: error.message
                        }),
                    });
                });
            });
        }

        // Add connectivity test endpoint
        else if (httpMethod === 'GET' && path === '/connectivity-test') {
            const https = require('https');

            return new Promise((resolve) => {
                console.log('Testing basic internet connectivity...');
                https.get('https://httpbin.org/ip', (res) => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => {
                        console.log('Successfully reached external API');
                        resolve({
                            statusCode: 200,
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({
                                message: "Internet connectivity works",
                                response: JSON.parse(data),
                                timestamp: new Date().toISOString()
                            }),
                        });
                    });
                }).on('error', (error) => {
                    console.error('Failed to reach external API:', error);
                    resolve({
                        statusCode: 500,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({
                            message: "No internet connectivity",
                            error: error.message
                        }),
                    });
                });
            });
        }

        // For all other endpoints, establish database connection
        dbClient = await connectToMongoDB();

        // Only handle POST requests to a specific path, e.g., /formSubmission
        if (httpMethod === 'POST' && path === '/formSubmission') {
            const requestBody = event.body ? JSON.parse(event.body) : {};

            if (Object.keys(requestBody).length === 0) {
                return {
                    statusCode: 400,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "https://barberpressure.com",
                        "Access-Control-Allow-Methods": "POST,OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type"
                    },
                    body: JSON.stringify({ message: "Request body cannot be empty for form submission." }),
                };
            }

            // Define the collection where you want to store form data
            const formSubmissionsCollection = dbClient.collection("submissions");

            // Insert the form data into the collection
            const result = await formSubmissionsCollection.insertOne({
                ...requestBody,
                submittedAt: new Date(), // Add a timestamp
            });

            return {
                statusCode: 201, // 201 Created
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                },
                body: JSON.stringify({
                    message: "Form submission successful!",
                    insertedId: result.insertedId
                }),
            };
        }
        else if (httpMethod == 'GET' && path == '/formSubmission/GET') {
            // TODO: Implement GET logic
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ message: "GET endpoint not implemented yet." }),
            };
        }
        else if (httpMethod == 'PATCH' && path == '/formPatch') {
            // TODO: Implement PATCH logic
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ message: "PATCH endpoint not implemented yet." }),
            };
        }
        // Add a diagnostic endpoint (remove this in production)
        else if (httpMethod === 'GET' && path === '/diagnostic') {
            try {
                // Test basic connectivity
                const collections = await dbClient.listCollections().toArray();
                const dbStats = await dbClient.stats();

                return {
                    statusCode: 200,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        message: "Database connection successful!",
                        database: "BarberSonDB",
                        collections: collections.map(c => c.name),
                        dbSize: dbStats.dataSize,
                        timestamp: new Date().toISOString()
                    }),
                };
            } catch (diagError) {
                console.error("Diagnostic error:", diagError);
                return {
                    statusCode: 500,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        message: "Database diagnostic failed",
                        error: diagError.message
                    }),
                };
            }
        }
        else if (httpMethod === 'OPTIONS' && path == '') {
            // Handle CORS preflight requests (Before browser sends actual request)
            return {
                statusCode: 204, // No Content
                headers: {
                    "Access-Control-Allow-Origin": "https://barberpressure.com",
                    "Access-Control-Allow-Methods": "POST,OPTIONS,GET,PATCH",
                    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Max-Age": "300"
                },
                body: "",
            };
        }
        else {
            // For any other method or path not explicitly handled
            return {
                statusCode: 405, // Method Not Allowed
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                },
                body: JSON.stringify({ message: "Method or path not supported." }),
            };
        }

    } catch (error) {
        console.error("Lambda execution error:", error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({
                message: "Internal server error.",
                error: error.message || "Unknown error"
            }),
        };
    }
};