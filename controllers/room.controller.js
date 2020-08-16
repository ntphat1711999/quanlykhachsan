const Room = require("../models/room.model");

module.exports.get = async (req, res) => {
  const rooms = await Room.findById(req.params.id);
};

module.exports.getAll = async (req, res) => {
  const room = await Room.find();
};
