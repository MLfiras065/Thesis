const express = require("express");
const router = express.Router();
const stripe =require("stripe")("sk_test_51PXUqxJX5WGHFkJ31O1qxQ15vwQMJAfwgxnsxFgRK1AVeoGQkobGuMQjlfrEmWQJPVwkr7kYyWlfY7RArTYSg6PV00917RxfY9")

router.post("/payment/:amount", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.params.amount,
      currency: 'usd',
      confirmation_method: 'automatic', 
    });

    console.log(paymentIntent, "paymentint");
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;