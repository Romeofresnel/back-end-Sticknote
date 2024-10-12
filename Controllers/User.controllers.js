const userModel = require("../Models/User.model");
const objectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select("-password");
  res.status(200).json(users);
  console.log(users);
};

module.exports.userInfo = (req, res) => {
  if (!objectID.isValid(req.params.id)) {
    res.status(400).send("id introuvabe" + req.params.id);
  }
  userModel
    .findById(req.params.id, (err, docs) => {
      if (!err) {
        res.json(docs);
        console.log(docs);
      } else {
        console.log("id introuvable" + err);
      }
    })
    .select("-password");
};

module.exports.PostUser = async (req, res) => {
  const { nom, prenom, email, password } = req.body;

  await userModel
    .create({ nom, prenom, email, password })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Une erreur est survenue" });
    });
  // };
};

module.exports.updateUser = async (req, res) => {
  if (!objectID.isValid(req.params.id)) {
    res.status(400).send("id introuvabe" + req.params.id);
  }
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(user);
};
module.exports.deleteUser = async (req, res) => {
  if (!objectID.isValid(req.params.id)) {
    res.status(400).send("id introuvabe" + req.params.id);
  }
  try {
    await userModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "user supprimer" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
