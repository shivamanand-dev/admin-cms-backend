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

router.put("/saveData/:id", getUser, async (req, res) => {
  try {
    await StaticWebPageData.findByIdAndUpdate(req.params.id, {
      data: req.body,
    });

    const staticWebPageData = await StaticWebPageData.findOne({
      user: req.user.id,
    });

    success = true;
    res.status(200).send({ staticWebPageData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
