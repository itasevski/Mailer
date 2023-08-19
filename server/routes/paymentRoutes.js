const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey); // initializing stripe with strapi secret key for confirming transactions
const requireLogin = require("../middleware/requireLogin");

module.exports = (app) => {
  // ROUTE-SPECIFIC middleware (requireLogin)
  // req, res and next objects automatically passed on to custom route-specific middleware by express
  // can contain multiple middlewares, as long as response is sent back in route handler
  app.post("/api/stripe", requireLogin, async (req, res) => {
    await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });
    // 1. token is received from Client as a POST request with body that contains token object
    // 2. a request is sent to Stripe API with token (token is "id" field from token object), along with stripe secret key
    // 3. token is validated, transaction is confirmed and user is charged

    req.user.credits += 5; // 4. credits are added to user's account
    const user = await req.user.save(); // mongoose model object has save() function for data persistence
    res.send(user); // send back updated user data
  });
};
