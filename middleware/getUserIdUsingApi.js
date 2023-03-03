const ApiKey = require("../models/api-keys/Api-key");

const getUserIdUsingApiKey = async (req, res, next) => {
  const key = req.header("key");

  const user = await ApiKey.findOne({ key });

  req.user = { id: user.createdBy.toString() };

  next();
};

module.exports = getUserIdUsingApiKey;
