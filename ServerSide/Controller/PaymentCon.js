const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


exports.processPayment = async (req, res) => {
    try {

        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            Currency: 'inr',
            metadata: {
                company: 'Ecommerce'
            }
        })

        res.status(200).json({ success: true, Client_secret: myPayment.client_secret })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Payment Faield', error });
    }
}


exports.sendStripeApiKey = async (req, res) => {
    try {
    res.status(200).json({ StripeApiKey: process.env.STRIPE_API_KEY });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
