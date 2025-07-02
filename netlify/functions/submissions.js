exports.handler = async(event,context) {
    const allowedOrigins = [
        'https://barberpressure.com',
        'https://www.barberpressure.com',
        'http://localhost:5173'

    ]
   
    const origin = event.headers.origin;
    const isAllowedOrigin = allowedOrigins.includes(origin);

    const headers = {
        'Access-Control-Allow-Origin': isAllowedOrigin? origin : 'null',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,GET,PATCH,DELETE,OPTIONS',
        'Access-Control-Max-Age':'86400'
    };

    switch(event.httpMethod){
        case 'POST'://route for creation
            if(isAllowedOrigin){
                try{
                    const data =JSON.parse(event.body);
                    data.timestamp = new Date().toISOString;//append datetime of request to form Submit 
                    
                    lambda_url = process.env.LAMBDA_MONGO_HANDLER_URL;
                    api_key = process.env.API_KEY;
                    
                    const response = await fetch(lambda_url,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                            api_key
                        },
                        body:JSON.stringify(data)
                    })
                    if(!response.ok){
                        throw new Error(`Lambda responded with status:${response.status}`);
                    }
                    const result = await response.json();
                    return{
                        statusCode:200,
                        headers:{
                            'Access-Control-Allow-Origin':origin,
                            'Content-Type':'application/json',
                            'Cache-Control':'no-cache',
                        },
                        body:JSON.stringify({})      
                    }

                }
                catch(error){
                    console.log('Error:',JSON.stringify(error.message));
                }

            }
            else {
                return {
                    statusCode: 403,
                    body: JSON.stringify({ error: 'Origin not allowed' })
                };
            }

        break;
        case'GET':
        if(isAllowedOrigin){
            
        }
        else{
            return {
                statusCode: 403,
                body: JSON.stringify({ error: 'Origin not allowed' })
            };
        }
        break;
        case('DELETE'):
        break;
        case('OPTIONS'):
            if(isAllowedOrigin){
                return{
                    statusCode:200,
                    headers:headers,
                    body:''
                };
            }
            else{
                return{
                    statusCode:403,
                    body:JSON.stringify({error:'Origin not allowed'})
                };
            }

        break;
    };

}