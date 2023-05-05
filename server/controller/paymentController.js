// const Paystack = require('paystack');
const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);

// const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

console.log(paystack);

const paystackController = {
  initiatePayment: async (req, res) => {
    try {
      const { email, amount } = req.body;

      // const payment = await paystack.initializeTransaction({
      //   email,
      //   amount: amount * 100, // Paystack API requires amount in kobo
      //   callback_url: `${process.env.url}/callback`,
      // });

      // Initialize the transaction

      console.log(process.env.url)
const transaction =await paystack.transaction.initialize({
  amount: amount *100,
  email: email,
  callback_url: process.env.callbackUrl
});

      res.json({
        paymentUrl: transaction.data.authorization_url,
        reference: transaction.data.reference,
      });

     // Redirect the user to the Paystack payment page
     console.log(transaction)
// res.redirect(transaction.data.authorization_url);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  },

  verifyPayment: async (req, res) => {
    try {
      const { reference } = req.body;

      const payment = await paystack.transaction.verify({ reference });

      if (payment.data.status === 'success') {
        // Payment was successful
        res.json({ message: 'Payment successful' });
      } else {
        // Payment was not successful
        res.status(400).json({ message: 'Payment not successful' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  },
};

module.exports = paystackController;