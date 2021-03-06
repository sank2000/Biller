const logger = require('js-logger');

const { User } = require("../models");

exports.getUser = async(req, res) => {
  try {
    const users = await User.find({ type: "customer" },{ name: 1 });
    res.json(users);
  }
  catch (err) {
    logger.error(err)
  }
};

exports.getAllUser = async(req, res) => {
  try {
    const users = await User.find({},{password : 0});
    res.json(users);
  }
  catch (err) {
    logger.error(err)
  }
};

exports.getUserbyId = async(req, res) => {
  try {
    const users = await User.findById(req.body.id,{password : 0});
    res.json(users);
  }
  catch (err) {
    logger.error(err)
  }
};