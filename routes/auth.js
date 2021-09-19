const express = require("express");
const Router = express.Router();

const { signin, signup } = require("../handlers/auth");

Router.post("/signin", signin);
Router.post("/signup", signup);

module.exports = Router;
