const express = require('express');

const userrouter = express.Router();

const {
  register, login, changeUserRole, resetPassword, logout,
} = require('../controllers/usercontroller');

const { authguard } = require('../middlewares/adminauth');

userrouter.route('/').post(register);
userrouter.route('/login').get(login);
userrouter.route('/:id').put(authguard, changeUserRole);

module.exports = userrouter;
