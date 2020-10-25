module.exports = (req,res,next) => {
  if (req.session.user.type === "admin" || req.session.user.type === "owner") {
    next();
  } else {
    res.status(403).json({
      message : "unauthorised"
    })
  }
}