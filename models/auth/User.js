const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  liveCountry: {
    type: Array,
    default: "",
  },
  profileImageUrl: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("user", UserSchema);
