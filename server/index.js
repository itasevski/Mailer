// imports
require("dotenv").config();
const express = require("express");
const cookieSession = require("cookie-session");
require("./model/User");
require("./model/Survey");
require("./services/passport"); // code that we just want to be executed
const mongoose = require("mongoose");
const keys = require("./config/keys");
const mailTrackingOptions = require("./util/mailTrackingOptions");
const passport = require("passport");
const bodyParser = require("body-parser");
const { expressApp } = require("nodemailer-mail-tracking");

// env variables
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

// database
mongoose.connect(MONGO_URI).then(() => console.log("Database connected."));
mongoose.connection.on("error", (err) =>
  console.log(`MongoDB error: ${err.message}`)
);

// server
const app = express();

// middleware for GENERAL REQUEST PROCESSING
app.use(bodyParser.json()); // middleware that takes body of POST requests (if any), converts it to JSON and assigns it to "req.body" field of req (request object)
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // milliseconds
    keys: [keys.cookieKey], // array of keys, if more than one is provided, the picked key will be randomly selected
  })
);
// express doesn't know how to work with cookies by default, so we need to make our server use the cookie-session library for cookie management
// cookie-session automatically extracts incoming cookies, decrypts them and also encrypts outgoing cookies

app.use(passport.initialize()); // middleware needed for passport initialization to work with cookies & sessions
app.use(passport.session());
// middleware needed for session manipulation, such as altering the request object, i.e changing the user field, which
// is the session ID by default and replacing it with the deserialized User

app.use(
  "/api/surveys/submit/:surveyId/:option",
  expressApp(mailTrackingOptions)
);
// for the specified path/handler, use the "nodemailer-mail-tracking" mail tracking middleware returned from "expressApp", that contains our
// mail tracking options

// routes
require("./routes/testRoute")(app); // returns an arrow function that we call with our app
require("./routes/authRoutes")(app);
require("./routes/paymentRoutes")(app);
require("./routes/surveyRoutes")(app);

app.listen(SERVER_PORT, () =>
  console.log(`Server listening on port ${SERVER_PORT}`)
);
