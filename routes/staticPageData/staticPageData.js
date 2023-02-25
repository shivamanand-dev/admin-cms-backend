const express = require("express");
const getUser = require("../../middleware/getUser");
const StaticWebPageData = require("../../models/staticWebPageData/StaticWebPageData");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const webSiteData = await StaticWebPageData.find({
      user: req.header("_id"),
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
      homePage: req.body,
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
