const Pusher = require("pusher");

module.exports = async (channel, event, data) => {
  const pusher = await new Pusher({
    appId: "1356009",
    key: "5de81663f40a5783d421",
    secret: "5745f7f7d41802c4a860",
    cluster: "ap2",
    useTLS: true,
  });
  await pusher.trigger(channel, event, {
    data,
  });
  console.log("trigger");
};
