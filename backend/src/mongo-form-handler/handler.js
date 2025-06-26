const { MongoClient, ServerApiVersion } = require('mongodb');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

// Use module-scoped variables for MongoClient and DB connection
// This allows Lambda to reuse the connection across warm invocations.
let cachedMongoClient = null;
let cachedDb = null;

// Function to get the MongoDB URI from Secrets Manager
async function getMongoUriFromSecretsManager(secretName, region) {
    const client = new SecretsManagerClient({ region });
    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
                VersionStage: "AWSCURRENT",
            })
        );
        // Secrets Manager stores the secret string directly.
        // If your secret is a JSON string, you might need to parse it,
        // e.g., JSON.parse(response.SecretString).mongoUri
        return response.SecretString;
    } catch (error) {
        console.error("Error fetching secret:", error);
        throw new Error("Failed to retrieve database credentials.");
    }
}

// Function to connect to MongoDB
async function connectToMongoDB() {
    // Check if a cached connection exists and is still valid
    if (cachedDb && cachedMongoClient && cachedMongoClient.topology && cachedMongoClient.topology.isConnected()) {
        console.log('Using cached MongoDB connection.');
        return cachedDb;
    }

    console.log('Establishing new MongoDB connection...');
    const secretName = process.env.MONGO_URI_SECRET_NAME; // Get secret name from environment variable
    const region = process.env.AWS_REGION || "us-east-1"; // Default region if not set

    if (!secretName) {
        throw new Error("MONGO_URI_SECRET_NAME environment variable is not set.");
    }

    try {
        const MONGO_URI = await getMongoUriFromSecretsManager(secretName, region);

        cachedMongoClient = new MongoClient(MONGO_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            maxIdleTimeMS: 60000, // Close idle connections after 60 seconds
            maxPoolSize: 5,       // Max 5 connections in the pool
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
        });

        await cachedMongoClient.connect();
        // Replace "BarberSonDB" with the actual name of your MongoDB database
        cachedDb = cachedMongoClient.db("BarberSonDB");
        console.log('MongoDB connected successfully.');
        return cachedDb;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Failed to connect to the database.");
    }
}

// Lambda Handler
exports.handler = async (event) => {
    let dbClient;

    try {
        // Ensure the MongoDB connection is established or reused
        dbClient = await connectToMongoDB();

        const httpMethod = event.httpMethod;
        const path = event.path;

        // Only handle POST requests to a specific path, e.g., /formSubmission
        if (httpMethod === 'POST' && path === '/formSubmission') {
            const requestBody = event.body ? JSON.parse(event.body) : {};

            if (Object.keys(requestBody).length === 0) {
                return {
                    statusCode: 400,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*", // Adjust for production
                        "Access-Control-Allow-Methods": "POST,OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type"
                    },
                    body: JSON.stringify({ message: "Request body cannot be empty for form submission." }),
                };
            }

            // Define the collection where you want to store form data
            const formSubmissionsCollection = dbClient.collection("formSubmissions");

            // Insert the form data into the collection
            const result = await formSubmissionsCollection.insertOne({
                ...requestBody,
                submittedAt: new Date(), // Add a timestamp
            });

            return {
                statusCode: 201, // 201 Created
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*", // Adjust for production
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                },
                body: JSON.stringify({
                    message: "Form submission successful!",
                    insertedId: result.insertedId
                }),
            };
        } else if (httpMethod === 'OPTIONS') {
            // Handle CORS preflight requests
            return {
                statusCode: 204, // No Content
                headers: {
                    "Access-Control-Allow-Origin": "*", // Must match the AllowedOrigins in template.yaml
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
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
                    "Access-Control-Allow-Origin": "*", // Adjust for production
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
                "Access-Control-Allow-Origin": "*", // Adjust for production
                "Access-Control-Allow-Methods": "POST,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({
                message: "Internal server error.",
                error: error.message || "Unknown error"
            }),
        };
    }
    // No `finally` block for `mongoClient.close()` as we want to reuse the connection.
};