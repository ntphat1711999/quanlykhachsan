const auth = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.redirect("/auth/signin");
};

module.exports = auth;
