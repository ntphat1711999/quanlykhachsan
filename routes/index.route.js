const router = require("express").Router();
const Room = require("../models/room.model");
const catRoom = require("../models/cat-room.model");

router.get("/", (req, res) => {
  res.render("index");
});

// Quản lý loại phòng
router.get("/quanlyloaiphong", (req, res) => {
  catRoom
    .find()
    .then((response) => {
      console.log(response);
      res.render("quanlyloaiphong", {
        catRooms: response,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/quanlyloaiphong/themloaiphong", (req, res) => {
  res.render("themloaiphong");
});

router.post("/quanlyloaiphong/themloaiphong", (req, res) => {
  const { ten, soluong, dongia } = req.body;
  const newCatRoom = new catRoom({
    ten: ten,
    so_luong: soluong,
    don_gia: dongia,
  });

  newCatRoom
    .save()
    .then((response) => {
      res.redirect("/quanlyloaiphong");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/quanlyloaiphong");
    });
});

router.get("/quanlyloaiphong/chinhsualoaiphong/:id", (req, res) => {
  catRoom
    .findById(req.params.id)
    .then((response) => {
      console.log(response);
      res.render("chinhsualoaiphong", {
        catRoom: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/quanlyloaiphong");
    });
});

router.post("/quanlyloaiphong/chinhsualoaiphong/:id", (req, res) => {
  const { ten, soluong, dongia } = req.body;
  catRoom
    .findByIdAndUpdate(req.params.id, {
      ten: ten,
      so_luong: soluong,
      don_gia: dongia,
    })
    .then((response) => {
      console.log(response);
      res.redirect("/quanlyloaiphong");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/quanlyloaiphong");
    });
});

// Quản lý phòng
router.get("/quanlyphong", (req, res) => {
  res.render("quanlyphong");
});

router.get("/quanlyphong/themphong", (req, res) => {
  res.render("themphong");
});

router.get("/quanlyphong/chinhsuaphong", (req, res) => {
  res.render("chinhsuaphong");
});

// Quản lý thức ăn
router.get("/quanlythucan", (req, res) => {
  res.render("quanlythucan");
});

router.get("/quanlythucan/themthucan", (req, res) => {
  res.render("themthucan");
});

router.get("/quanlythucan/chinhsuathucan", (req, res) => {
  res.render("chinhsuathucan");
});

// Quản lý nhân viên
router.get("/quanlynhanvien", (req, res) => {
  res.render("quanlynhanvien");
});

router.get("/quanlynhanvien/themnhanvien", (req, res) => {
  res.render("themnhanvien");
});

router.get("/quanlynhanvien/chinhsuanhanvien", (req, res) => {
  res.render("chinhsuanhanvien");
});

router.get("/capnhatthongtin", (req, res) => {
  res.render("capnhatthongtin");
});

router.get("/doimatkhau", (req, res) => {
  res.render("changepassword");
});

router.get("/datphong", (req, res) => {
  res.render("datphong");
});

router.get("/traphong", (req, res) => {
  res.render("danhsachdatphong");
});

router.get("/traphong/thanhtoan", (req, res) => {
  res.render("thanhtoanphong");
});

router.get("/traphong/chinhsuadatphong", (req, res) => {
  res.render("chinhsuadatphong");
});

router.get("/hoadonthuephong", (req, res) => {
  res.render("danhsachhoadonthuephong");
});

router.get("/datthucan", (req, res) => {
  res.render("datthucan");
});

router.get("/datthucan/thanhtoan", (req, res) => {
  res.render("taohoadonthucan");
});

module.exports = router;
