// const Paystack = require('paystack');
const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const axios = require('axios');

// const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

console.log(paystack);

const paystackController = async (req, res) => {
  const { email, amount } = req.body; // Expecting email and amount from the frontend

  const data = {
    email,
    amount: amount * 100, // Paystack expects amount in kobo (1 Naira = 100 kobo)
    callback_url: process.env.callbackUrl 
  };

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const authorizationUrl = response.data.data.authorization_url;
    res.json({ authorizationUrl });
  } catch (error) {
    console.error("Error initializing Paystack transaction:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = paystackController;