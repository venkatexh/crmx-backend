const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const items = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: items.amount,
      currency: "usd",
      description: "Software development project",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return res.status(200).send({clientSecret: paymentIntent.client_secret});
  } catch (err) {
    return next(err);
  }
}