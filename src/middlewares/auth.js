const response = require("../helpers/response");
const jwt = require("jsonwebtoken");
const middleware = {};

middleware.login = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return response(res, 400, { msg: "token required" });
    }
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRETS);
    req.userData = decoded;
    next();
  } catch (error) {
    return response(res, 500, error);
  }
};

module.exports = middleware;
