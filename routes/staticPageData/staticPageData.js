const express = require("express");
const getUser = require("../../middleware/getUser");
const getUserIdUsingApiKey = require("../../middleware/getUserIdUsingApi");
const StaticWebPageData = require("../../models/staticWebPageData/StaticWebPageData");
const router = express.Router();

router.get("/", getUserIdUsingApiKey, async (req, res) => {
  try {
    const webSiteData = await StaticWebPageData.findOne({
      user: req.user.id,
    });
    res.status(200).send(webSiteData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/saveData", getUser, async (req, res) => {
  try {
    let success = false;

    const staticWebPageData = await StaticWebPageData.create({
      data: req.body,
      user: req.user.id,
    });

    success = true;
    res.status(200).send({ success, staticWebPageData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
