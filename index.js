const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const bcrypt = require("bcryptjs");
let CronJob = require("cron").CronJob;
const app = express();
let Fingerprint = require("express-fingerprint");
const mailer = require("nodemailer");
var fc = require("./first_central_support.js");
const xml2js = require("xml2js");
let moment = require("moment");
let fileSys = require("file-system");
const crypto = require("crypto");
const encKey = "sjH3skuqioOpA6bd8istqw12EQVC7dfa";
const encIv = "opopghavcwequybt";
// Assuming that 'path/file.txt' is a regular file.
const PAYSTACK_SECRET_KEY = "sk_live_0f2fecebabbe7c45ede7165f014d17650c189f59";
const TERMII_API_KEY =
"TL7MaKRwyztFqbU2FQiJ8NXKy3Ybv6xIy8ThGm5wTD26Pe4HWpFwjC1l531evG";
const { attachPaginate } = require("knex-paginate");

// routers
const activityRouter = require("./routes/activities.js");
const accountStatementRouter = require('./routes/accountStatement')


//setup express fingerprint;
app.use(
  Fingerprint({
    parameters: [
      Fingerprint.useragent,
      Fingerprint.acceptHeaders,
      Fingerprint.geoip,
    ],
  })
);

app.use(cors({ credentials: true, origin: false }));
//setup cors blocking
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Rquested-with, Content-Type,Accept"
  );
  next();
});

app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb" }));
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// ejs usage

// app.set("view engine",  "ejs")


// routes

app.use("/support/accountpdf", accountStatementRouter)
// frequentActivities
app.use("/support/activities", activityRouter)

const PORT = 4500;

attachPaginate();

app.listen(PORT, function () {
  console.log("Support Server is running on port " + PORT);
});


module.exports = app