const express = require("express");
const {createPaymentIntent} = require("../handlers/payment");
const Router = express.Router();

Router.post('/create-payment-intent', createPaymentIntent);

module.exports = Router;