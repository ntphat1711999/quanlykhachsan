const auth = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.send("404 not found");
};

module.exports = auth;
