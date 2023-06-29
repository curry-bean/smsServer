const express = require("express");
const AfricasTalking = require('africastalking');
require('dotenv').config()
//console.log(process.env.API_KEY) // remove this after you've confirmed it is working

//Initialize Africa's talking
const africastalking = AfricasTalking({
    apiKey:process.env.API_KEY,
    username:'africasmsApp'
})


//create an instance of the express application
const PORT = process.env.PORT || 8080;
const app = express();


// Parse JSON bodies
app.use(express.json({limit: '10kb'}));

//Define the route for sending the SMS
app.post('/send-sms', async (req,res)=>{
    console.log(req.body);
    const {phoneNumber} = req.body;

    if(!phoneNumber){
        return res.status(404).send("Phone Number is required");
    }
    try{
        // if(phoneNumber.startsWith("07")) {
        //     <phoneNumber className="trim"></phoneNumber>
        // }
        //send the message
        const result = await africastalking.SMS.send({
            to:phoneNumber,
            message:"Hey Welcome to Africastalking"
        });

        console.log(result);
        res.status(200).json({
            status: "success",
            data: {
                result
            }
        })
    }catch(error){
        console.log("Error",error);
        res.status(500).send("An error occured while send SMS")
    }
});
//start the server
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})
