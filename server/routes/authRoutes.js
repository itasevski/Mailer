const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    }) // first parameter specifies type of strategy, second parameter specifies scope of user information that we want to access
  );
  // 1. authenticate() gets invoked with our configured GoogleStregy, sending a request to google.com/auth?appId=<keys.clientId>
  // 2. google shows login page, prompting user to grant access by selecting google account
  // 3. user grants access, google generates validation code and redirects to http://localhost:5000/auth/google/callback?code=<validationCode> (redirect is configured in Google cloud console)

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => res.redirect("/dashboard") // additional function for request handling after authenticate() is executed
  );
  // 4. call authenticate() again with the "google" parameter
  // 5. passport sees that this route matches specified callbackURL and grabs validationCode from request
  // 6. passport sends a request to google once again with validationCode
  // 7. google validates validationCode and returns accessToken, refreshToken, profile

  app.get("/api/whoami", (req, res) => {
    res.send(req.user);
  });
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
