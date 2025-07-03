exports.handler = async (event, context) => {
    const allowedOrigins = [
        'https://barberpressure.com',
        'https://www.barberpressure.com',
        'http://localhost:5173',
        'http://localhost:8888'
    ]

    const origin = event.headers.origin;
    const isAllowedOrigin = allowedOrigins.includes(origin);

    const headers = {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'null',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,GET,PATCH,DELETE,OPTIONS',
        'Access-Control-Max-Age': '86400'
    };

    switch (event.httpMethod) {
        case 'POST':
            if (isAllowedOrigin) {
                try {
                    const data = JSON.parse(event.body);
                    data.timestamp = new Date().toISOString();

                    const lambda_url = process.env.LAMBDA_MONGO_HANDLER_URL;
                    const api_key = process.env.API_KEY;

                    const response = await fetch(lambda_url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'api_key': api_key
                        },
                        body: JSON.stringify(data)
                    })

                    if (!response.ok) {
                        throw new Error(`Lambda responded with status:${response.status}`);
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
                    }
                } catch (error) {
                    console.log('Error:', error.message);
                    // ADD THIS RETURN - this was missing!
                    return {
                        statusCode: 500,
                        headers: {
                            'Access-Control-Allow-Origin': origin,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ error: 'Internal server error' })
                    };
                }
            } else {
                return {
                    statusCode: 403,
                    headers,
                    body: JSON.stringify({ error: 'Origin not allowed' })
                };
            }

        case 'GET':
            // ADD RETURN - this was missing!
            return {
                statusCode: 501,
                headers,
                body: JSON.stringify({ error: 'GET not implemented yet' })
            };

        case 'DELETE':
            // ADD RETURN - this was missing!
            return {
                statusCode: 501,
                headers,
                body: JSON.stringify({ error: 'DELETE not implemented yet' })
            };

        case 'OPTIONS':
            if (isAllowedOrigin) {
                return {
                    statusCode: 200,
                    headers: headers,
                    body: ''
                };
            } else {
                return {
                    statusCode: 403,
                    headers,
                    body: JSON.stringify({ error: 'Origin not allowed' })
                };
            }

        // ADD DEFAULT CASE - this was missing!
        default:
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ error: 'Method not allowed' })
            };
    }
}