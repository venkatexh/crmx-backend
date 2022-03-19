require("dotenv").config();
const express = require("express");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const emailRoutes = require("./routes/sendEmail");
const campaignRoutes = require("./routes/campaign");
const tagRoutes = require("./routes/tag");
const planRoutes = require("./routes/plan");
const paymentRoutes = require("./routes/payment");
const notificationRoutes = require("./routes/notifications");
const organizationRoutes = require("./routes/organization");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://www.crmx.fun", "https://crmx.fun"],
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("CRMX API");
});
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api/email/send", emailRoutes);
app.use("/api", campaignRoutes);
app.use("/api/user/tags", tagRoutes);
app.use("/api/user", planRoutes);
app.use("/api", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/organization", organizationRoutes);

app.use(function (req, res, next) {
  let error = new Error("Not found!");
  error.status = 400;
  next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}..`);
});
