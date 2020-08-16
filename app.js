const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;
const MONGO_URL =
  "mongodb+srv://admin:9eEPZWwIm5ykOjzN@cluster0.elca9.mongodb.net/quanlykhachsan?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Connectd to mongo successfully");
});
mongoose.connection.on("error", (err) => {
  console.log("Connected to mongo fail", err);
});

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// use ejs engine
app.set("view engine", "ejs");

// routes
<<<<<<< HEAD
app.use("/", require("./routes/room.route"));
=======
app.use("/room", require("./routes/room.route"));
>>>>>>> origin/manage-view

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
