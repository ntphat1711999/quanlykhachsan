const router = require("express").Router();
const Staff = require("../models/staff.model");

// Quản lý nhân viên
router.get("/", (req, res) => {
  res.render("quanlynhanvien");
});

router.get("/themnhanvien", (req, res) => {
  res.render("themnhanvien");
});

router.post("/themnhanvien", (req, res) => {
  const { ten, cmnd, luong } = req.body;
  const newStaff = new Staff({
    ten,
    cmnd,
    luong,
  });

  newStaff
    .save()
    .then((response) => {
      res.redirect("back");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/chinhsuanhanvien", (req, res) => {
  res.render("chinhsuanhanvien");
});

module.exports = router;
