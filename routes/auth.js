const express = require("express");
const Router = express.Router();

const { signin, signup } = require("../handlers/auth");
const { createUser } = require("../handlers/googleAuth");

Router.post("/signin", signin);
Router.post("/signup", signup);
Router.post("/google", createUser);

module.exports = Router;
