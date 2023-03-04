const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../../models/auth/User");
const ApiKey = require("../../models/api-keys/Api-key");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const getUser = require("../../middleware/getUser");
const { deEncrypt } = require("../../utils/deEncrypt");
const StaticWebPageData = require("../../models/staticWebPageData/StaticWebPageData");

const JWT_SECRET = process.env.JWT_SECRET;

router.post(
  "/signup",
  // deEncryptUserDetails,
  [
    body("email", "Enter correct email").isEmail(),
    body("username", "Username must be min 3 char").isLength({ min: 3 }),
    body("password", "Password must be min 6 char").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      let success = false;

      const { name, email, username, password, profileImageUrl } = req.body;

      // Handle Validators
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

      //   Find user with same userName and email
      let user = await User.findOne({ email: email });
      let availUsername = await User.findOne({ username: username });

      if (user || availUsername) {
        return res.status(400).json({ success, message: "Already Exists" });
      }

      //   Hash Password
      var salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(password, salt);

      //   Create User
      user = await User.create({
        name,
        email,
        username,
        password: hashedPassword,
        profileImageUrl,
      });

      //   create jwt token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      await StaticWebPageData.create({
        user: data.user.id,
      });

      const key = await ApiKey.generateKey(data.user.id);

      success = true;
      res.json({ success, user, authToken, key });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error occur" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    let success = false;

    // Decrypt Coming Data
    // const deEncryptedDetails = deEncryptAll(req.body);

    //   Destructure request body
    const { username, password } = req.body;

    //   Find User
    let user = await User.findOne({ username }).select("+password");

    //   If no User
    if (!user) {
      return res.status(400).json({
        success: success,
        message: "sorry, login with correct credentials",
      });
    }

    //   Compare Pass
    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      return res.status(401).json({
        success: success,
        error: "sorry, login with correct credentials",
      });
    }

    //   create jwt token
    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);

    let userDetails = await User.findOne({ username });

    success = true;
    res.status(200).json({ success: success, userDetails, authToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Server error occur" });
  }
});

router
  .post("/api-key", getUser, async (req, res) => {
    try {
      const key = await ApiKey.generateKey(req.user.id);
      res.send({ key });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "Server error occur" });
    }
  })
  .get("/api-key", getUser, async (req, res) => {
    const data = await ApiKey.findOne({ createdBy: req.user.id });

    res.status(200).send({ key: data.key });
  });

// router.get()

module.exports = router;
