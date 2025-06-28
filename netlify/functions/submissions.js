
const fetch = require('node-fetch');
const AWS_LAMBDA_FUNCTION_URL = process.env.AWS_MONGOHANDLER_LAMBDA_URL;
const AWS_REGION = 'us-east-1';

// Helper for consistent responses back to the browser
const createBrowserResponse = (statusCode, body, extraHeaders = {}) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            // CORS headers for the browser frontend
            // IMPORTANT: In production, change "*" to your actual frontend domain
            // e.g., "https://barberpressure.com"
            "Access-Control-Allow-Origin": process.env.NODE_ENV === 'development' ? '*' : "https://barberpressure.com",
            "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS", // Ensure all methods are allowed
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token", // Common headers you might use
            "Access-Control-Max-Age": "86400", // Cache preflight for 24 hours
            ...extraHeaders,
        },
        body: JSON.stringify(body),
    };
};

exports.handler = async (event, context) => {
    console.log("Netlify Function received event:", JSON.stringify(event, null, 2)); //debugging

    const httpMethod = event.httpMethod;
    // Netlify's rewrite rules will ensure event.path looks like /api/formsubmissions or /api/formsubmissions/123
    const path = event.path;
    const normalizedPath = path.toLowerCase().replace(/\/$/, ''); // Normalize path

    // Extract path segments for routing logic
    // If path is /api/formsubmissions, segments will be ["api", "formsubmissions"]
    // If path is /api/formsubmissions/123, segments will be ["api", "formsubmissions", "123"]
    const pathSegments = normalizedPath.split('/').filter(Boolean); // Filter(Boolean) removes empty strings

    // The 'resource' we care about for routing is typically the one after '/api/'
    // e.g., 'formsubmissions'
    const resource = pathSegments[1]; // Assumes /api/{resource}

    // The ID for single-item operations (if present)
    const id = pathSegments.length > 2 ? pathSegments[2] : undefined; // Assumes /api/{resource}/{id}

    // Parse request body for methods that typically send one
    let requestBody = {};
    if (httpMethod === 'POST' || httpMethod === 'PATCH' || httpMethod === 'PUT') {
        try {
            requestBody = event.body ? JSON.parse(event.body) : {};
        } catch (e) {
            console.error("Netlify Function: Error parsing request body:", e);
            return createBrowserResponse(400, { message: "Invalid JSON in request body." });
        }
    }

    // Extract query parameters for GET requests (e.g., for filtering, sorting, pagination)
    const queryParams = event.queryStringParameters || {};

    try {
        // --- CORS Preflight Handler ---
        // This MUST be handled FIRST, before any other method logic
        if (httpMethod === 'OPTIONS') {
            return createBrowserResponse(204, ""); // 204 No Content, headers handled by createBrowserResponse
        }

        // --- Validate AWS Lambda Function URL ---
        if (!AWS_LAMBDA_FUNCTION_URL) {
            console.error("Netlify Function: AWS_LAMBDA_FUNCTION_URL_MONGO_HANDLER environment variable is not set.");
            return createBrowserResponse(500, { message: "Backend configuration error." });
        }

        // --- Prepare Payload for AWS Lambda ---
        // This object will be passed as `event.Payload` to your AWS Lambda.
        // It should contain all info your AWS Lambda needs to route and process.
        let payloadForAwsLambda = {
            httpMethod: httpMethod,
            // Construct the path for AWS Lambda.
            // AWS Lambda's internal routing expects paths like /submit, /submissions, /submissions/id
            // So we strip the '/api' prefix here.
            path: `/${resource}${id ? '/' + id : ''}`,
            queryStringParameters: queryParams,
            body: requestBody, // Pass the parsed body directly
            // You can also pass other info from the original event if your AWS Lambda needs it
            // e.g., headers: event.headers, requestContext: event.requestContext
        };

        // --- Invoke AWS Lambda Function ---
        

        // Send the request to the AWS Lambda Function URL
        const awsLambdaResponse = await fetch(AWS_LAMBDA_FUNCTION_URL, {
            method: 'POST', // Function URLs typically expect POST for invocation
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers required by your Lambda Function URL, e.g., Authorization
            },
            body: JSON.stringify(payloadForAwsLambda),
        });

        // Process AWS Lambda's response
        const awsLambdaPayload = await awsLambdaResponse.json();

        // Return the response from AWS Lambda directly to the browser
        return createBrowserResponse(awsLambdaResponse.status, awsLambdaPayload, awsLambdaResponse.headers);

    } catch (error) {
        console.error("Netlify Function: Error during Lambda invocation or processing:", error);

        // Determine appropriate status code based on error type
        let statusCode = 500;
        let errorMessage = "Internal server error.";

        if (error.name === 'ResourceNotFoundException' || error.name === 'InvalidParameterException') {
            statusCode = 404; // Could be Lambda function not found, or bad invocation
            errorMessage = "Backend Lambda not found or invalid invocation.";
        } else if (error.message.includes("Timed out")) {
            statusCode = 504; // Gateway Timeout
            errorMessage = "Backend Lambda timed out.";
        }

        return createBrowserResponse(statusCode, { message: errorMessage, details: error.message });
    }

    
}