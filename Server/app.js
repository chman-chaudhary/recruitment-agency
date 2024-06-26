if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const Job = require("./models/Job.js");
const profileRouter = require("./Routes/ProfileRoute.js");
const authRoute = require("./Routes/AuthRoute.js");
const jobRoute = require("./Routes/JobRoute.js");
const dbUrl = process.env.DB_URL;

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(cookieParser());

main()
  .then(console.log("Connection Successfull"))
  .catch((err) => console.log("Connection Failed"));

async function main() {
  await mongoose.connect(dbUrl);
}

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

app.use("/", authRoute);
app.use("/profile", profileRouter);
app.use("/job", jobRoute);

app.get("/home", async (req, res) => {
  const jobs = await Job.find({}).limit(8);
  res.json(jobs);
  res.send("Hello Home");
});
