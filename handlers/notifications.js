const db = require("../models/index");

exports.getNotification = async (req, res, next) => {
  try {
    let notification = await db.Notification.findById(req.body.id);
    res.status(200).send(notification);
  } catch (err) {
    return next(err);
  }
};

exports.getOrgNotifications = async (req, res, next) => {
  try {
    let notifications = await db.Notification.find({
      owner: req.params.id,
    });
    res.status(200).send(notifications);
  } catch (err) {
    return next(err);
  }
};
