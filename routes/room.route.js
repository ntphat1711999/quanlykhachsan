const router = require("express").Router();

// models
const Room = require("../models/room.model");

router.route("/")
  .get((req, res) => {
    res.send("room");
  });

module.exports = router;
