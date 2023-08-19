const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");
// if we don't provide a second parameter, mongoose will return an interface which we can use to query, create, update, delete users

const googleCallbackUrl = process.env.GOOGLE_AUTH_CALLBACK_URL;

// gets called after authentication is finished, i.e after finished authentication callback is done
passport.serializeUser((user, cb) => cb(null, user.id));
// sets a cookie in the browser of the user (the internal ID, encrypted) that will be used as identifying information for the user

// gets called when a request is received from a user, with a browser cookie set by the serializeUser function
passport.deserializeUser((id, cb) =>
  User.findById(id).then((user) => cb(null, user))
);
// grabs the decrypted cookie from the user's browser, finds the user in the database and calls cb with the user as the second parameter, resumes flow

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: googleCallbackUrl,
    },
    // the cb (or done) callback function tells passport that it should resume the authentication process, i.e move to the next step
    (accessToken, refreshToken, profile, cb) => {
      // after authentication is finished, check database if user exists
      // the google profile ID is only used to identify a user coming through the OAuth flow, after that, the workflow in our app only uses the
      // internal id of the user from the database (the document ID)
      // console.log(profile);
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) cb(null, existingUser);
        // a. if user exists, call done callback function with null for the error parameter, and the found user as the second parameter
        else
          new User({ googleId: profile.id })
            .save()
            .then((user) => cb(null, user));
        // b. if user does not exist, call done callback function with null for the error parameter, and the newly created user as the second parameter
      });
      // the next step of the authentication process is the serializeUser function, which passport will automatically call after this callback, i.e after cb (done)
      // is called (inside this callback), with the second parameter that is passed into the cb function, as a parameter to the serializeUser function.
    }
    // 8. this callback gets invoked when authentication is finished from the google side
  )
);
