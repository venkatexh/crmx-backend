const express = require('express');
const Router = express.Router({mergeParams: true});

const {changePlan} = require("../handlers/plan");

Router.route('/change-plan').post(changePlan);

module.exports = Router;