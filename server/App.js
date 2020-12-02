const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const checkAuth = require("./middleware/check-auth");

//-----------MORGAN-----------------
// MORGAN logs everything like GET, POST, etc requests
app.use(morgan("dev"));
//-----------CORS-------------------
// It ensures that we prevent Cross-Origin Resource Sharing(CORS) errors
app.use(cors());
//--------"Body-parser" === EXPRESS----------
//extended: true allows to parse nested objects
//extended: false only allows simple object for urlencoded data
app.use(express.urlencoded({ extended: false }));
// Extracts json data and makes it easy readable
app.use(express.json());

//------------------------
//--------MongoDB----------
mongoose.connect("mongodb://localhost:27017/videosApp", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//-----------------------------------------
//To make uploads folder publically available with '/api/videos'/ route
app.use("/api/videos", express.static("media/uploads"));
//-----Routes-------
// app.use("/", (req, res) => {
//   res.send("App is running now ...");
// });

app.use("/api/login", require("./routes/login"));
app.use("/api/signUp", require("./routes/signUp"));
app.use("/api/upload", checkAuth, require("./routes/upload"));

module.exports = app;
