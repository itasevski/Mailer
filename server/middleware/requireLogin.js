// custom middleware
module.exports = (req, res, next) => {
  if (!req.user)
    return res
      .status(401)
      .send({ error: "You must be logged in to perform action." });

  next();
  // next() is a function that gets automatically passed to this custom middleware and it is used when our logic is
  // finished to invoke the next middleware after it
};
