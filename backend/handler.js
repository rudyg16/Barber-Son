const {MongoClient} = require("mongodb");
let client;
module.exports.submitForm =async(event) =>{
    try{
        const data =JSON.parse(event.body);
        const uri =process.env.MONGO_URI;
        if(!client){//If client is already init from a cold start no reason to overwrite/waste time during warm invocations
            client = new MongoClient(uri,{useUnifiedTopoglogy:true})
            await client.connect();
        }
        const db = client.db("BarberAndSon"); 
        const result = await db.collection("submissions").insertOne(data);
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Form submitted successfully",
                id: result.insertedId,
            }),
        }
    }
    catch (err) {
        console.error("Error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to submit form" }),
        };
      }
    
}