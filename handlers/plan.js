const db = require('../models');

exports.changePlan = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.query.user_id);
    const billDate = {
      date: Date.now()
    };
    const startDate = {
      billDate: Date.now()
    }
    const initialPlan = req.body.plan;
    user.plan = Object.assign(initialPlan, startDate);
    const initialBill = req.body.bill;
    const finalBill = Object.assign(initialBill, billDate);
    user.bills.push(finalBill);
    await user.save();
    let {id, email, firstName, lastName, company, plan, billing_address} = user;
    return res.status(200).json({
      message: "Plan upgraded",
      user: {id, email, firstName, lastName, company, plan, billing_address}
    });
  } catch (err) {
    return next(err);
  }
}