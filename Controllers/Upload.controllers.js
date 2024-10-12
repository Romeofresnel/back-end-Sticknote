const userModel = require("../Models/User.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  try{
    if (
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      ) throw Error("invalid file")
  }catch(err){
    return console.log(err);
  }

  const fileName=req.body.name + ".jpg"
  await pipeline(
    req.file.stream,
    fs.createWriteStream(
        `${__dirname}/../Sticknote Pro front-end/public/image/${fileName}`
    )
  )
  try{
    await userModel.findByIdAndUpdate(
        req.body.userId,
        {$set:{picture:"./image/" + fileName}},
        {new: true,upsert:true,setDefaultsOnInsert:true},
        (err,docs)=>{
            if(!err) return res.send(docs)
            else return console.log(err);
        }
    )
  }catch(err){ console.log(err);}
};
