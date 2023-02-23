const express = require("express");
const getUser = require("../../middleware/getUser");
const router = express.Router();
const User = require("../../models/auth/User");

router.put("/update", getUser, async (req, res) => {
  try {
    const { liveCountry, name, profileImageUrl } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, liveCountry, profileImageUrl },
      { returnDocument: "after" }
    );

    return res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error occur" });
  }
});

module.exports = router;
