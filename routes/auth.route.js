const passport = require('passport');
const bcrypt = require('bcryptjs');

const router = require("express").Router();

router.get("/signin", (req, res) => {
  res.render("login");
});

router.post("/signin", 
  passport.authenticate('login', {
      successRedirect: '/',
      failureRedirect: '/auth/signin',
      failureFlash: true
  })
);

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", 
  passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/auth/signup',
    failureFlash: true
  })
);

router.get("/resetpassword", (req, res) => {
  res.render("forget-password");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/signin");
});

module.exports = router;
