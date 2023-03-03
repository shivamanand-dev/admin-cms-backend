const mongoose = require("mongoose");
const crypto = require("crypto");
const { promisify } = require("util");
const { encrypt } = require("../../utils/encrypt");
// const encryptAll = require("../../utils/encrypt");
const randomBytes = promisify(crypto.randomBytes);

const { Schema } = mongoose;

const ApiKey = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

ApiKey.pre("save", async function (next) {
  try {
    // const salt = await bcrypt.genSalt(10);
    const hash = encrypt(this.key);

    this.key = hash;

    next();
  } catch (error) {
    next(error);
  }
});

ApiKey.statics.generateKey = async function (userId) {
  try {
    const rawBytes = await randomBytes(16);
    const key = rawBytes.toString("hex");
    const apiKey = new this({ key, createdBy: userId });
    await apiKey.save();
    return key;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("apiKey", ApiKey);
