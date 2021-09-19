require("dotenv").config();
const express = require("express");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("CRMX API");
});
app.use("/api/auth", authRoutes);

app.use(function (req, res, next) {
  let error = new Error("Not found!");
  error.status = 400;
  next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running..");
});
