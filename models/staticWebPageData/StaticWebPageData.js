const mongoose = require("mongoose");

const { Schema } = mongoose;

const StaticWebPageData = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  data: {
    type: Object,
    default: {
      navbar: {
        logo: "https://firebasestorage.googleapis.com/v0/b/cms-studio-9741c.appspot.com/o/logo%2FLogo%20Appstrom.png?alt=media&token=5def69c1-cc5d-4960-80b8-37cae01fd574",

        navOptions: ["Home", "Pages", "Portfolio", "Blog", "Shop", "Elements"],
      },
      hero: { heroBackgroundImage: "", heroSecTitle: "", heroSlogan: "" },
    },
  },
});

module.exports = mongoose.model("staticWebPageData", StaticWebPageData);
