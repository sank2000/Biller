const logger = require('js-logger');
const bcrypt = require('bcrypt');
const saltRounds = 5;

const { User } = require('../models');

exports.CheckSession = (req, res) => {
  /*
   To get details about current user
   password: 0 => to hide password from result
  */
  if (req.session.user) {
    User.findById(req.session.user, { password: 0 }, function (err, result) {
      if (!err) {
        res.json({
          message: 'You are signed in!',
          auth: true
        });
      }
    });
  } else {
    res.json({
      message: 'You are not logged in!',
      auth: false
    });
  }
};

exports.signUp = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const userData = new User({
      ...req.body,
      password: hash
    });
    userData
      .save()
      .then(result => {
        req.session.user = userData._id;
        const { password, ...Data } = userData._doc;
        res.json({
          ...Data,
          message: 'Account created successfully.',
          auth: true
        });
      })
      .catch(err => {
        if (err.code === 11000) {
          res.json({
            message: 'Error creating account : Account already exists',
            auth: false
          });
        } else {
          res.json({
            message: 'Unable to create account : Error - ' + err.code,
            auth: false
          });
        }
      });
  });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        message: 'Email ID not exits',
        auth: false
      });
    } else {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          req.session.user = user._id;
          const { password, ...Data } = user._doc;
          res.json({
            ...Data,
            message: `Welcome ${user.name}!`,
            auth: true
          });
        } else {
          res.json({
            message: 'Incorrect Password',
            auth: false
          });
        }
      });
    }
  } catch (err) {
    logger.ERROR('Error:' + err);
  }
};

exports.signOut = (req, res) => {
  req.session.destroy(function (err) {
    res.json({
      auth: false
    });
  });
};
