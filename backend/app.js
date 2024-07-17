const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const HttpError = require("./models/http-error");
require("dotenv").config();
const port = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, Authorization,"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, PATCH, DELETE");
  next();
});

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("NO ROUTES LIKE THIS EXISTS!", 404);
  throw error;
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured" });
});
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.klcc3ue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => app.listen(port))
  .then(() => console.log("listening..."))
  .catch((err) => console.log(err));
