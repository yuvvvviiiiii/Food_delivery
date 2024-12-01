const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

const isLoggedIn = (req, res, next) => {

    const token = req.headers.authorization;

    if(token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {

        if(err) {
          res.status(400).json({ message:"invalid token"});
        } else {
          req.user = {email: decoded.email};
          next();
        }
      })
    } else {
      res.status(401).json({ message:"no token provided" });
    }
};

module.exports = { isLoggedIn };