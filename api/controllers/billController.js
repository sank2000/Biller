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