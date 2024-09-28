const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      unique: true,
      required: true,
    },
    //
    redirectURL: {
      type: String,
      required: true,
    },
    // how many time it got visited or we can say how many time you click.
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users",
    },
  },
  { timestamps: true } // basically it store the time of creation and updation
);
const URL = mongoose.model("url", urlSchema);

module.exports = URL;
