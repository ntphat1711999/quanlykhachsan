const router = require("express").Router();
const Staff = require("../models/staff.model");

// Quản lý nhân viên
router.get("/", (req, res) => {
  Staff.find()
    .then((response) => {
      console.log(response);
      res.render("quanlynhanvien", {
        staffs: response,
      });
    })
    .catch((err) => {
      console.log(err);
    });
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
      res.redirect("/quanlynhanvien");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/chinhsuanhanvien/:id", (req, res) => {
  Staff.findById(req.params.id)
    .then((response) => {
      console.log(response);
      res.render("chinhsuanhanvien", {
        staff: response,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/chinhsuanhanvien/:id", (req, res) => {
  const { ten, cmnd, luong, songaynghi } = req.body;
  Staff.findByIdAndUpdate(req.params.id, {
    ten,
    cmnd,
    luong,
    so_ngay_nghi: songaynghi,
  })
    .then((response) => {
      console.log(response);
      res.redirect("/quanlynhanvien");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/xoanhanvien/", (req, res) => {
  Staff.findByIdAndDelete(req.body.iddel)
    .then((response) => {
      console.log(response);
      res.redirect("/quanlynhanvien");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
