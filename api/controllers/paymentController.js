const Stripe = require("stripe");
const logger = require('js-logger');

const { Bill,Transaction} = require("../models");

const stripe = new Stripe(process.env.STRIPE_SECRET);

exports.handleStripe = async (req, res) => {
  const { id, amount,billId } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      description: "Biller",
      payment_method: id,
      confirm: true
    });

    logger.info(payment);

    await Bill.findByIdAndUpdate(billId, { paid : true });

    return res.json({
      done: true,
      message: "Payment Successfull"
    });

  } catch (error) {
    logger.error(error);
    return res.json({
      message: error.message
    });
  }
};


exports.handlePayPal = async (req, res) => {
  const { id, status,billId,time,email } = req.body;

  try {
    const transaction = new Transaction({
      billId,
      transactionId: id,
      type: "paypal",
      status,
      time,
      email
    });

    await transaction.save();
    await Bill.findByIdAndUpdate(billId, { paid : true });

    return res.json({
      done: true,
      message: "Payment Successfull"
    });

  } catch (error) {
    logger.error(error);
    return res.json({
      message: error.message
    });
  }
};