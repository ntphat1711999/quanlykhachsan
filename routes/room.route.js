const router = require("express").Route();

// models
const Room = require("../models/room.models");

router.route("/")
  .get((req, res) => {
    res.send("room");
  });

module.exports = router;
