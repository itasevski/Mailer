// does not need to be imported! local development server looks for a file with this name and executes it.

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    }) // create a proxy middleware and forward all requests that match relative target URLs from list to localhost:5000
  );
};
