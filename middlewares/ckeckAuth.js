const jwt = require("jsonwebtoken");
const userModel = require("../Models/User.model");

const extractBearer = (authorization) => {
  if (typeof authorization !== "string") {
    return false;
  }

  const parts = authorization.match(/(bearer)\s+(\S+)/i); // Use \S+ for non-whitespace token
  return parts && parts[2];
};

module.exports.checkAuth = (req, res, next) => {
  const accessToken =
    req.headers.authorization && extractBearer(req.headers.authorization);

  jwt.verify(
    accessToken,
    process.env.TOKEN_SECRET,
    async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" }); // Generic message
      } else {
        const user = await userModel.findById(decodedToken.id);
        res.locals.user = user;
      }

      next(); // Pass control to the next middleware or route handler
    }
  );
};

module.exports.requireAuth = (req, res, next) => {
  const accessToken =
    req.headers.authorization && extractBearer(req.headers.authorization);

  if (!accessToken) {
    return res.status(401).json({ message: "Authorization required" }); // Generic message
  }

  jwt.verify(
    accessToken,
    process.env.TOKEN_SECRET,
    async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" }); // Generic message
      } else {
        const user = await userModel.findById(decodedToken.id);
        res.locals.user = user;
      }

      next(); // Pass control to the next middleware or route handler
    }
  );
};
