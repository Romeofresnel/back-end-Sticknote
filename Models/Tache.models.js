const mongoose = require("mongoose");

const TacheSchema = new mongoose.Schema(
  {
    tacheId: {
      type: String,
      required: true,
    },
    folderId: {
      type: String,
    },
    titre: {
      type: String,
      required: true,
      default: "titre",
      minlength: 0,
      maxlength: 25,
    },
    contenue: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "./users/cool.png",
    },
    like: {
      type: [String],
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);
const TacheModels = mongoose.model("Tache", TacheSchema);
module.exports = TacheModels;
