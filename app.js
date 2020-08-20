const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

// middleware
const auth = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL =
  "mongodb+srv://admin:Ud16X3zDchiMsFd9@cluster0.elca9.mongodb.net/quanlykhachsan?retryWrites=true&w=majority";
//"mongodb+srv://dpldevil:dplong99@cluster0-2mpsa.mongodb.net/quanlykhachsan?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo successfully");
});
mongoose.connection.on("error", (err) => {
  console.log("Connected to mongo fail", err);
});

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// use ejs engine
app.set("view engine", "ejs");

// express body parser
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(
  session({
    secret: "quan_ly_khach_san",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 3600 * 24,
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));

// flash
app.use(flash());
app.use(require("./middlewares/flash"));

// passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/auth", require("./routes/auth.route"));
app.use("/", require("./routes/index.route"));
app.use("/quanlynhanvien", require("./routes/staff.route"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
