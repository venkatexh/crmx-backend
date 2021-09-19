const express = require("express");
const errorHandler = require("./handlers/error");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.status(200).send("CRMX API");
});

app.use(function (req, res, next) {
  let error = new Error("Not found!");
  error.status = 400;
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running..");
});
