const express = require("express");
const AfricasTalking = require('africastalking');
require('dotenv').config();

// Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: '8a2dab6c16b94184000062ec07b1fc85becf493e6987f74d3c0f11f737bb92fd',
  username: 'teamofsix'
});

// Create an instance of the express application
const PORT = process.env.PORT || 8080;
const app = express();

// Parse JSON bodies
app.use(express.json({ limit: '10kb' }));

// Define the route for sending the SMS
app.post('/send-sms', async (req, res) => {
  const { message, phoneNumber } = req.body;

  console.log("message Received : "+message);
  console.log("phoneNumber Received is :"+phoneNumber);

  if (!message || !phoneNumber) {
    return res.status(400).json({
      error: "Message and phoneNumber are required"
    });
  }

  try {
    // Send the message
    const result = await africastalking.SMS.send({
      to: phoneNumber,
      message: message
    });
    console.log("Message :", message);
    console.log("PhoneNumber: ", phoneNumber);
    console.log(result);

    console.log(result);
    res.status(200).json({
      status: "success",
      data: {
        result
      }
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      error: "An error occurred while sending SMS"
    });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
