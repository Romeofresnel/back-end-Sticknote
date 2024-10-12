const folderModel = require("../Models/Folder.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllFolder = async (req, res) => {
  const folder = await folderModel.find().sort({
    updatedAt: -1,
  });
  res.status(200).json(folder);
};
module.exports.getFolder = async (req, res) => {
  console.log(req.params);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID incorrect: " + req.params.id);

  folderModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log(err);
  });
};

module.exports.Poster = async (req, res) => {
  if (!req.body.title && !req.body.description) {
    res.status(400).json({ message: "merci de remplir avant" });
  }

  const folder = await folderModel.create({
    folderId: req.body.folderId,
    title: req.body.title,
    description: req.body.description,
  });
  res.status(200).json(folder);
};
module.exports.Update = async (req, res) => {
  const up = await folderModel.findById(req.params.id);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID incorrect: " + req.params.id);

  const Update = await folderModel.findByIdAndUpdate(up, req.body, {
    new: true,
  });
  res.status(200).json(Update);
};
// supprimer une tache existante grace a son ID
module.exports.Delete = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID incorrect: " + req.params.id);
  const det = await folderModel.findById(req.params.id);
  await det.remove();
  res.status(200).json({ message: "la tache a ete supprimer" + det });
};
