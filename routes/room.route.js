const express = require("express");
const router = require("express").Router();

// models
const Room = require("../models/room.model");

// controllers
const controller = require("../controllers/room.controller");

router
  .route("/")
  .get((req, res) => {
    res.send("room");
  })
  .post()
  .put()
  .delete();

module.exports = router;
