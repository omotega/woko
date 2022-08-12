const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const userguard = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } else {
    res.status(400);
    throw new Error('not authorized');
  }
  if (!token) {
    res.status(401);
    throw new Error('not authorized,no token');
  }
};

module.exports = {
  userguard,
};
