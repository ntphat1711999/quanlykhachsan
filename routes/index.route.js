const router = require("express").Router();
const Room = require("../models/room.model");
const catRoom = require("../models/cat-room.model");
const Visitor = require("../models/visitor.model");
const RoomBill = require("../models/roombill.model");
const { response } = require("express");

router.get("/", (req, res) => {
  res.render("index");
});

// Quản lý loại phòng
router.get("/quanlyloaiphong", (req, res) => {
  catRoom
    .find()
    .then((response) => {
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
      res.redirect("/quanlyloaiphong");
    });
});

router.post("/quanlyloaiphong/xoaloaiphong/:id", (req, res) => {
  catRoom
    .findByIdAndRemove(req.params.id)
    .then((response) => {
      res.redirect("back");
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
  console.log(ten,' ', soluong, ' ', dongia);
  catRoom
    .findByIdAndUpdate(req.params.id, {
      ten: ten,
      so_luong: soluong,
      don_gia: dongia,
    })
    .then((response) => {
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
  Room.find()
    .then((response) => {
      res.render("datphong", {
        rooms: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("datphong");
    });
});

router.post("/datphong", (req, res) => {
  const { ten, cmnd, phong_thue, ngay_thue } = req.body;
  const newVistor = new Visitor({
    ten,
    cmnd,
    phong_thue,
    ngay_thue,
  });

  newVistor
    .save()
    .then((res) => {
      console.log(res);
      res.redirect("/datphong");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/datphong");
    });
});

// Trả phòng
router.get("/traphong", (req, res) => {
  Visitor.find()
    .then((response) => {
      console.log(response);
      res.render("danhsachdatphong", {
        datphong: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("danhsachdatphong");
    });
});

router.post("/traphong", (req, res) => {});

router.get("/traphong/thanhtoan", (req, res) => {
  res.render("thanhtoanphong");
});

router.get("/traphong/chinhsuadatphong", (req, res) => {
  res.render("chinhsuadatphong");
});

router.get("/hoadonthuephong", (req, res) => {
  RoomBill.find()
    .then((response) => {
      console.log(response);
      res.render("danhsachhoadonthuephong", {
        roombills: response,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/hoadonthuephong/xoahoadon", (req, res) => {
  RoomBill.findByIdAndRemove();
});

router.get("/datthucan", (req, res) => {
  res.render("datthucan");
});

router.get("/datthucan/thanhtoan", (req, res) => {
  res.render("taohoadonthucan");
});

module.exports = router;
