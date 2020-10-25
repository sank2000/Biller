module.exports = (req,res,next) => {
  if (req.session.user.type === "customer" || req.session.user.type === "admin") {
    next();
  } else {
    res.status(403).json({
      message : "unauthorised"
    })
  }
}