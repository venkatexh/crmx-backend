const express = require("express");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.status(200).send("CRMX API");
});

app.listen(PORT, () => {
  console.log("Server running..");
});
