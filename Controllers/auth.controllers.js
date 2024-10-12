const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require('../Models/User.model')

module.exports.signIn = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "utilisateur incorest" });
  }
  userModel
    .login(email, password)
    .then((user) => {
      if (user === null) {
        console.log(user.password);
        return res.status(500).json({ message: "ce compte n'existe pas" });
      }
      if (email === user.email) {
        if (!password == user.password) {
          console.log(user.password);
          return res.status(500).json({ message: "password incorrect" });
        } else {
          const token = jwt.sign(
            {
              id: user.id,
              username: user.nom,
              email: user.email,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "180d" }
          );

          return res.json({
            access_token: token,
            email: user.email,
            id: user.id,
          });
        }
      } else {
        console.log(user.email);
        return res.status(500).json({ message: "email incorect" });
      }
    })
    .catch((err) => res.status(401).json({ messages: err }));
};
