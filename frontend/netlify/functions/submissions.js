exports.handler = async (event, context) => {
    // Add safety checks for undefined objects
    const headers = event.headers || {};
    const httpMethod = event.httpMethod || 'GET';

    const allowedOrigins = [
        'https://barberpressure.com',
        'https://www.barberpressure.com',
        'http://localhost:5173',
        'http://localhost:8888'
    ];

    const origin = headers.origin || headers.Origin || '';
    const isAllowedOrigin = allowedOrigins.includes(origin);

    const corsHeaders = {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'null',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,GET,PATCH,DELETE,OPTIONS',
        'Access-Control-Max-Age': '86400'
    };

    // Add environment variable checks
    const lambda_url = process.env.LAMBDA_MONGO_HANDLER_URL;
    const api_key = process.env.API_KEY;

    if (!lambda_url || !api_key) {
        console.error('Missing environment variables:', {
            lambda_url: !!lambda_url,
            api_key: !!api_key
        });
    }

    switch (httpMethod) {
        case 'POST':
            if (isAllowedOrigin) {
                try {
                    // Add safety check for event.body
                    if (!event.body) {
                        throw new Error('Request body is missing');
                    }

                    const data = JSON.parse(event.body);
                    data.timestamp = new Date().toISOString();

                    if (!lambda_url || !api_key) {
                        throw new Error('Missing environment variables');
                    }

                    const response = await fetch(lambda_url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'api_key': api_key
                        },
                        body: JSON.stringify(data)
                    });

                    if (!response.ok) {
                        throw new Error(`Lambda responded with status: ${response.status}`);
                    }

                    const result = await response.json();
                    return {
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': origin,
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache',
                        },
                        body: JSON.stringify({ success: true, data: result })
                    };
                } catch (error) {
                    console.error('Error:', error.message);
                    return {
                        statusCode: 500,
                        headers: {
                            'Access-Control-Allow-Origin': origin,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ error: 'Internal server error', message: error.message })
                    };
                }
            } else {
                return {
                    statusCode: 403,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Origin not allowed' })
                };
            }

        case 'GET':
            return {
                statusCode: 501,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'GET not implemented yet' })
            };

        case 'DELETE':
            return {
                statusCode: 501,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'DELETE not implemented yet' })
            };

        case 'OPTIONS':
            if (isAllowedOrigin) {
                return {
                    statusCode: 200,
                    headers: corsHeaders,
                    body: ''
                };
            } else {
                return {
                    statusCode: 403,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Origin not allowed' })
                };
            }

        default:
            return {
                statusCode: 405,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'Method not allowed' })
            };
    }
};