const ApiKey = require("../models/api-keys/Api-key");
const hashCrypto = require("../utils/hashCrypto");

const getUserIdUsingApiKey = async (req, res, next) => {
  const key = req.header("key");

  const hashedKey = hashCrypto(key);

  const user = await ApiKey.findOne({ hashedKey });

  req.user = { id: user._id.toString() };

  next();
};

module.exports = getUserIdUsingApiKey;
