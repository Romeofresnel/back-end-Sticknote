const mongoose = require("mongoose");

const folderShema = new mongoose.Schema(
  {
    folderId:{
      type:String,
      required:true
    },
    title: {
      type: String,
      max: 100,
      required: true,
    },
    description: {
      type: String,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

const folderModel = mongoose.model("folder", folderShema);

module.exports = folderModel;