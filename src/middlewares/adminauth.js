const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const authguard = (req, res, next) => {
  // const tokie = req.cookie.jwt;
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      res.status(401);
      throw new Error('not authorized,you are not an admin');
    } else {
      next();
    }
  } else {
    res.status(401);
    throw new Error('not authorized');
  }
  if (!token) {
    res.status(401);
    throw new Error('not authorized');
  }
};

module.exports = {
  authguard,
};
