// app.js
// Inside app.js 
const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const Razorpay = require('razorpay'); 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// This razorpayInstance will be used to
// access any resource from razorpay


const razorpayInstance = new Razorpay({

    // Replace with your key_id
    key_id: process.env.RZP_ID,

    // Replace with your key_secret
    key_secret: process.env.RZP_KEY
});


const PORT = process.env.PORT || '5000';

// Here we will create two routes one 
// /createOrder and other /verifyOrder 
//Inside app.js
app.post('/createOrder', (req, res)=>{ 

    // STEP 1:
    const {amount,currency,receipt, notes}  = req.body;      
    // STEP 2:    
    razorpayInstance.orders.create({amount, currency, receipt, notes}, 
        (err, order)=>{
        
          //STEP 3 & 4: 
          if(!err)
            res.json(order)
          else
            res.send(err);
        }
    )
});
// Replace these comments with the code 
// provided later in step 2 & 8 for routes

app.listen(PORT, ()=>{
    console.log("Server is Listening on Port ", PORT);
});