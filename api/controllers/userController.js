const logger = require('js-logger');

const { User } = require("../models");

exports.getUser = async(req, res) => {
  try {
    const users = await User.find({ type: "customer" },{ name: 1 });
    res.json(users);
  }
  catch (err) {
    console.log(err)
  }
};