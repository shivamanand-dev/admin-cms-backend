const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRET } = process.env;

console.log(JWT_SECRET);

const authenticate = (req, res, next) => {
  try {
    const token = req.header("authToken");
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = authenticate;
