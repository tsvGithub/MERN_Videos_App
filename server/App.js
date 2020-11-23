const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

//-----------MORGAN-----------------
// Used to log everything like GET, POST, etc requests
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
mongoose.connect("mongodb://127.0.0.1/videosApp", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//-----------------------------------------
//-----Routes-------
// app.use("/", (req, res) => {
//   res.send("App is running now ...");
// });
app.use("/api/signUp", require("./routes/signUp"));

module.exports = app;
