const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const userShema = new mongoose.Schema(
  {
    nom: {
      type: String,
      max: 100,
    },
    prenom: {
      type: String,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      validator: [isEmail],
      // trim: true
      unique: true,
    },
    picture: {
      type: String,
      default: "./Profils",
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 4,
    },
    taches: {
      type: [String],
    },
    like: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userShema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); // Ne pas hacher si le mot de passe n'a pas changé
  }

  const salt = await bcrypt.genSalt(10); // Ajuster le nombre de tours de salage si nécessaire
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userShema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Email incorrect"); // Erreur générique pour la sécurité
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Mot de passe incorrect"); // Erreur générique pour la sécurité
  }

  return user;
};

const userModel = mongoose.model("user", userShema);

module.exports = userModel;
