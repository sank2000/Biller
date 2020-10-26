const logger = require('js-logger');

const { Bill,User } = require("../models");

exports.createBill = async(req, res) => {
  
  const { customerId, company, items, tax, subTotal, total } = req.body;

  const bill = new Bill({
    customerId,
    tax,
    subTotal,
    total,
    company: JSON.parse(company),
    items: JSON.parse(items)
  })

  bill.save()
    .then(async (result) => {
      try {
        await User.findByIdAndUpdate(customerId, { $push: { bills: bill._id } });
        await User.findByIdAndUpdate(req.session.user.id, { $push: { bills: bill._id } });
        res.json({
          message: 'Bill created successfully.',
          done: true
        });
      }
      catch (err) {
        logger.error(user);
      }
    })
    .catch(err => {
      res.json({
        message: 'Unable to create Bill : Error - ' + err.code,
        done: false
      });
    });  
};


exports.showBills = async (req, res) => {

  try {
    const data = await User.findById(req.session.user.id, { bills: 1 });
    const bills = await Bill.find({_id : { $in : data.bills }})
    res.json(bills);
  } catch (err) {
    logger.error(err);
  }
  
}

exports.showPaidBills = async (req, res) => {

  try {
    const data = await User.findById(req.session.user.id, { bills: 1 });
    const bills = await Bill.find({_id : { $in : data.bills },paid : true})
    res.json(bills);
  } catch (err) {
    logger.error(err);
  }
  
}

exports.showNotPaidBills = async (req, res) => {

  try {
    const data = await User.findById(req.session.user.id, { bills: 1 });
    const bills = await Bill.find({_id : { $in : data.bills },paid : false})
    res.json(bills);
  } catch (err) {
    logger.error(err);
  }
  
}

exports.payBill = async (req, res) => {

  try {
    const data = await Bill.findByIdAndUpdate(req.body.id, { paid : true });
    res.json({
      done: true,
      message: "Payment Successfully"
    });
  } catch (err) {
    res.json({
        message: 'Unable to Pay Bill : Error - ' + err.code,
        done: false
      });
  }
  
}