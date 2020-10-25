const isAuth = require("./isAuth");
const isAdmin = require("./isAdmin");
const isCustomer = require("./isCustomer");
const isOwner = require("./isOwner");
const isNotAdmin = require("./isNotAdmin");
const isNotCustomer = require("./isNotCustomer");
const isNotOwner = require("./isNotOwner");

module.exports = { isAuth,isAdmin ,isCustomer,isOwner,isNotAdmin,isNotCustomer,isNotOwner };