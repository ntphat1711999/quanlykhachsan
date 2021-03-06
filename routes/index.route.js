const router = require("express").Router();
const Room = require("../models/room.model");
const catRoom = require("../models/cat-room.model");
const RoomBill = require("../models/roombill.model");
const { response } = require("express");
const moment = require("moment");
const { populate } = require("../models/room.model");
const Food = require("../models/food.model");
const FoodBill = require("../models/foodbill.model");

router.get("/", (req, res) => {
  res.render("index");
});

// Quản lý loại phòng
router.get("/quanlyloaiphong", (req, res) => {
  catRoom
    .find({ isDelete: false })
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
  const { ten, dongia } = req.body;
  const newCatRoom = new catRoom({
    ten: ten,
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

router.post("/quanlyloaiphong/xoaloaiphong", (req, res) => {
  Promise.all([
    catRoom.findByIdAndUpdate(req.body.iddel, { isDelete: true }),
    Room.findOneAndUpdate({ loai: req.body.iddel }, { isDelete: true }),
  ])
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
  const { ten, dongia } = req.body;
  catRoom
    .findByIdAndUpdate(req.params.id, {
      ten: ten,
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
  Room.find({ isDelete: false })
    .populate("loai")
    .then((response) => {
      let rooms = response.filter((element) => {
        if (element.loai.isDelete === false) {
          return element;
        }
      });
      console.log(rooms);
      res.render("quanlyphong", {
        rooms: rooms,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.redirect("/quanlyloaiphong");
    });
});

router.get("/quanlyphong/themphong", (req, res) => {
  catRoom
    .find({ isDelete: false })
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
      catRoom.findOneAndUpdate();
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
    .find({ isDelete: false })
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

router.post("/quanlyphong/xoaphong", (req, res) => {
  Room.findByIdAndUpdate(req.body.iddel, {
    isDelete: true,
  })
    .then((response) => {
      res.redirect("back");
    })
    .catch((err) => {
      res.redirect("back");
    });
});

// Quản lý thức ăn
router.get("/quanlythucan", (req, res) => {
  Food.find({ isDelete: false })
    .then((response) => {
      res.render("quanlythucan", {
        foods: response,
      });
    })
    .catch((err) => {
      res.redirec("/quanlythucan");
    });
});

router.post("/quanlythucan/themthucan", (req, res) => {
  const { ten_thuc_an, don_gia } = req.body;
  let newFood = new Food();
  newFood.ten_thuc_an = ten_thuc_an;
  newFood.don_gia = don_gia;
  newFood
    .save()
    .then((response) => {
      res.redirect("/quanlythucan");
    })
    .catch((err) => {
      res.redirect("back");
    });
});

router.get("/quanlythucan/themthucan", (req, res) => {
  res.render("themthucan");
});

router.get("/quanlythucan/chinhsuathucan/:id", (req, res) => {
  Food.findById(req.params.id)
    .then((response) => {
      res.render("chinhsuathucan", {
        foods: response,
      });
    })
    .catch((err) => {
      res.redirect("back");
    });
});

router.post("/quanlythucan/chinhsuathucan/:id", (req, res) => {
  const { ten_thuc_an, don_gia } = req.body;

  Food.findByIdAndUpdate(req.params.id, {
    ten_thuc_an,
    don_gia,
  })
    .then((reponse) => {
      res.redirect("/quanlythucan");
    })
    .catch((err) => {
      res.redirect("back");
    });
});

router.post("/quanlythucan/xoathuan/:id", (req, res) => {
  Food.findByIdAndUpdate(req.params.id, { isDelete: true })
    .then((response) => {
      res.redirect("back");
    })
    .catch((err) => {
      console.err(err.message);
      res.redirect("back");
    });
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
  Room.find({ tinh_trang: false, isDelete: false })
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
  RoomBill.find({ thanh_toan: false })
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
      response.songaythue = Math.abs(
        response.ngay_thue.getDate() - now.getDate()
      );
      response.tongtien =
        response.songaythue * response.phong_thue.loai.don_gia;
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

router.get("/traphong/chinhsuadatphong/:id", (req, res) => {
  RoomBill.findById(req.params.id)
    .populate("phong_thue")
    .then((response) => {
      console.log(response);
      let ngay = response.ngay_thue.getDate();
      let thang = "0" + (response.ngay_thue.getMonth() + 1).toString();
      let nam = response.ngay_thue.getFullYear();
      let ngaythue =
        nam.toString() + "-" + thang.slice(-2) + "-" + ngay.toString();
      Room.find({ tinh_trang: false })
        .then((response1) => {
          res.render("chinhsuadatphong", {
            roombill: response,
            rooms: response1,
            ngaythue,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/traphong/chinhsuadatphong/:id", (req, res) => {
  const { ten, cmnd, phongthue, ngaythue, phongcu } = req.body;
  RoomBill.findByIdAndUpdate(req.params.id, {
    ten,
    cmnd,
    phong_thue: phongthue,
    ngay_thue: ngaythue,
  })
    .then((response) => {
      if (phongcu !== phongthue) {
        Promise.all([
          Room.findByIdAndUpdate(phongcu, { tinh_trang: false }),
          Room.findByIdAndUpdate(phongthue, { tinh_trang: true }),
        ])
          .then((response) => {
            console.log(response);
            res.redirect("/traphong");
          })
          .catch((err) => console.log(err));
      } else {
        res.redirect("/traphong");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/traphong/xoadatphong", (req, res) => {
  RoomBill.findByIdAndDelete(req.body.iddel)
    .then((response) => {
      console.log(response);
      Room.findByIdAndUpdate(req.body.phongthue, {
        tinh_trang: false,
      })
        .then((response1) => {
          res.redirect("back");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("back");
    });
});

// Hoá đơn thuê phòng
router.get("/hoadonthuephong", (req, res) => {
  RoomBill.find({ thanh_toan: true })
    .populate({ path: "phong_thue", populate: { path: "loai" } })
    .then((response) => {
      console.log(response);
      let roombills = response;
      roombills = roombills.map((element) => {
        ngay_thue = moment(element.ngay_thue).format("L");
        ngay_tra = moment(element.ngay_tra).format("L");
        element.ngaythue = ngay_thue;
        element.ngaytra = ngay_tra;
        element.tongtien =
          Math.abs(element.ngay_thue.getDate() - element.ngay_tra.getDate()) *
          element.phong_thue.loai.don_gia;
        return element;
      });
      res.render("danhsachhoadonthuephong", {
        roombills,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("back");
    });
});

router.post("/hoadonthuephong/xoahoadon", (req, res) => {
  RoomBill.findByIdAndRemove(req.body.iddel)
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
  Food.find({ isDelete: false })
    .then((response) => {
      console.log(response);
      res.render("datthucan", {
        foods: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("back");
    });
});

router.get("/datthucan/thanhtoan", (req, res) => {
  const { ten, phong, thuc_an, so_luong } = req.query;
  Food.find({ _id: { $in: thuc_an } })
    .then((response) => {
      console.log(response);
      let tong_tien = 0;
      response.forEach((element, index) => {
        tong_tien += element.don_gia * so_luong[index];
      });
      res.render("taohoadonthucan", {
        ten,
        phong,
        thuc_an,
        so_luong,
        tong_tien,
        foods: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("back");
    });
});

router.post("/datthucan/thanhtoan", (req, res) => {
  const { ten, phong, thuc_an, tong_tien } = req.body;
  console.log(req.body);
  const newFoodBill = new FoodBill({
    ten,
    phong,
    thuc_an,
    tong_tien,
  });

  newFoodBill
    .save()
    .then((response) => {
      console.log(response);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("back");
    });
});

router.get("/hoadonthucan", (req, res) => {
  FoodBill.find()
    .then((response) => {
      console.log(response);
      res.render("danhsachhoadonthucan", {
        foodbills: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("back");
    });
});

router.post("/hoadonthucan/xoahoadon/:id", (req, res) => {
  FoodBill.findByIdAndDelete(req.params.id)
    .then((response) => res.redirect("/hoadonthucan"))
    .catch((err) => {
      console.log(err);
      res.redirect("back");
    });
});

module.exports = router;
