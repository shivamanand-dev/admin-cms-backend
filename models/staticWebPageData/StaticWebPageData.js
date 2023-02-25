const mongoose = require("mongoose");

const { Schema } = mongoose;

const StaticWebPageData = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  homePage: {
    type: Array,
    default: [
      {
        navbar: [
          { logo: "AppStrom" },
          {
            navOptions: [
              "Home",
              "Pages",
              "Portfolio",
              "Blog",
              "Shop",
              "Elements",
            ],
          },
        ],
      },
      {
        hero: [
          { heroBackgroundImage: "", heroSecTitle: "" },
          { heroSlogan: "" },
        ],
      },
    ],
  },
});

module.exports = mongoose.model("staticWebPageData", StaticWebPageData);
