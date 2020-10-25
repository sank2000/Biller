module.exports = (req,res,next) => {
  if (req.session.type === "admin") {
    next();
  } else {
    res.status(403).json({
      message : "unauthorised"
    })
  }
}