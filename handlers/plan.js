const db = require('../models');

exports.changePlan = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.query.user_id);
    user.plan = req.body.plan;
    const initialBill = req.body.bill;
    const date = {
      date: Date.now()
    };
    const finalBill = Object.assign(initialBill, date);
    user.bills.push(finalBill);
    await user.save();
    return res.status(200).json("Plan upgraded");
  } catch (err) {
    return next(err);
  }
}