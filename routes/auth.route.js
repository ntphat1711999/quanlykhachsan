const router = require("express").Router();

router.get("/signin", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/resetpassword", (req, res) => {
  res.render("forget-password");
});

router.get("/logout", (req, res) => {
  res.redirect("/auth/signin");
});

module.exports = router;
