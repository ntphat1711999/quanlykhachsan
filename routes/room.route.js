const router = require("express").Router();

// mws
const auth = require("../middlewares/auth");

// models
const Room = require("../models/room.model");

router.route("/")
  .get(auth, (req, res) => {
    res.send("room");
  });

module.exports = router;
