module.exports = (req,res,next) => {
  if (req.session.type === "owner") {
    next();
  } else {
    res.status(403).json({
      message : "unauthorised"
    })
  }
}