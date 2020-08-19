const router = require("express").Router();
const Room = require("../models/room.model");
const catRoom = require("../models/cat-room.model");
const RoomBill = require("../models/roombill.model");
const { response } = require("express");
const { route } = require("./auth.route");

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
  console.log(ten, " ", soluong, " ", dongia);
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
  Room.find()
    .populate("loai")
    .then((response) => {
      res.render("quanlyphong", {
        rooms: response,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect("/quanlyloaiphong");
    });
});

router.get("/quanlyphong/themphong", (req, res) => {
  catRoom
    .find()
    .then((response) => {
      res.render("themphong", {
        catRooms: response,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect("back");
    });
});

router.post("/quanlyphong/themphong", (req, res) => {
  const { tenphong, loaiphong } = req.body;
  let newRoom = new Room();
  newRoom.ten_phong = tenphong;
  newRoom.loai = loaiphong;

  newRoom
    .save()
    .then((response) => {
      res.redirect("/quanlyphong");
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect("back");
    });
});

router.get("/quanlyphong/chinhsuaphong/:id", (req, res) => {
  let cat;
  catRoom
    .find()
    .then((cats) => {
      cat = cats;
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect("back");
    });
  Room.findById(req.params.id)
    .populate("loai")
    .then((response) => {
      res.render("chinhsuaphong", {
        room: response,
        cat,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect("back");
    });
});

router.post("/quanlyphong/chinhsuaphong/:id", (req, res) => {
  const { tenphong, loaiphong, tinhtrang } = req.body;
  Room.findByIdAndUpdate(req.params.id, {
    ten_phong: tenphong,
    loai: loaiphong,
    tinh_trang: tinhtrang,
  })
    .then((response) => {
      res.redirect("/quanlyphong");
    })
    .catch((err) => {
      res.redirect("back");
    });
});

router.post("/quanlyphong/xoaphong/:id", (req, res) => {
  Room.findByIdAndRemove(req.params.id)
    .then((response) => {
      res.redirect("back");
    })
    .catch((err) => {
      res.redirect("back");
    });
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

// Quản lý tài khoản
router.get("/capnhatthongtin", (req, res) => {
  res.render("capnhatthongtin");
});

router.get("/doimatkhau", (req, res) => {
  res.render("changepassword");
});

// Đặt phòng
router.get("/datphong", (req, res) => {
  Room.find({ tinh_trang: false })
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
  console.log({ ten, cmnd, phong_thue, ngay_thue });
  const newRoomBill = new RoomBill({
    ten,
    cmnd,
    phong_thue,
    ngay_thue,
  });

  newRoomBill
    .save()
    .then((response) => {
      console.log(response);
      Room.findByIdAndUpdate(
        response.phong_thue,
        { tinh_trang: true },
        (err, doc) => {
          if (!err) {
            res.redirect("/traphong");
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/datphong");
    });
});

// Trả phòng
router.get("/traphong", (req, res) => {
  RoomBill.find()
    .populate("phong_thue")
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

router.get("/traphong/thanhtoan/:id", (req, res) => {
  RoomBill.findById(req.params.id)
    .populate({ path: "phong_thue", populate: { path: "loai" } })
    .then((response) => {
      let now = new Date();
      response.songaythue = response.ngay_thue.getDay() - now.getDay();
      console.log(response);
      res.render("thanhtoanphong", {
        roombill: response,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/traphong/thanhtoan/:id", (req, res) => {
  RoomBill.findByIdAndUpdate(req.params.id, {
    thanh_toan: true,
  })
    .then((response) => {
      console.log(response);
      Room.findByIdAndUpdate(response.phong_thue, {
        tinh_trang: false,
      }).then((response) => {
        console.log(response);
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/traphong/chinhsuadatphong", (req, res) => {
  res.render("chinhsuadatphong");
});

// Hoá đơn thuê phòng
router.get("/hoadonthuephong", (req, res) => {
  RoomBill.find({ thanh_toan: true })
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

router.post("traphong/xoadatphong/:id", (req, res) => {
  RoomBill.findByIdAndDelete(req.params.id)
    .then((response) => {
      console.log(response);
      res.redirect("back");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("back");
    });
});

router.get("/hoadonthuephong/xoahoadon/:id", (req, res) => {
  RoomBill.findByIdAndRemove(req.params.id)
    .then((response) => {
      console.log(response);
      res.redirect("back");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("back");
    });
});

// Đặt thức ăn
router.get("/datthucan", (req, res) => {
  res.render("datthucan");
});

router.get("/datthucan/thanhtoan", (req, res) => {
  res.render("taohoadonthucan");
});

module.exports = router;
