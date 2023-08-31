const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("Yor're not authenticated");
  }
};

module.exports = authenticateToken;
