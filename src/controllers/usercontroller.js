const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const { registerValidation, loginValidation } = require('../validation/uservalidation');

const register = async (req, res) => {
  const { error } = registerValidation.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.message);
  }
  const {
    firstname, lastname, email, username, password, role,
  } = req.body;
  if (!firstname || !lastname || !email || !username || !password) {
    res.status(400);
    throw new Error('please fill in the required fields');
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(200);
    throw new Error('User already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstname,
    lastname,
    email,
    username,
    password,
    role,
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error('could not create user, invalid user credentials');
  }
};

const login = async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.message);
  }
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    res.status(400);
    throw new Error('email,username,password not present');
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('user not found');
  } else {
    const savedpassword = await bcrypt.compare(password, user.password);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        password: user.password,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  }
};

const changeUserRole = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error('user not found');
  }
  const { role } = req.body;
  user.role = role === undefined ? user.role : role;
  await user.save;
  res.status(200).json({
    status: 'success',
    message: 'user role updated succesfully',
    data: user,
  });
};

const resetPassword = async (req, res) => {
  res.status(200).json('reset password route');
};

const logout = async (req, res) => {
  res.status(200).json('logout route');
};

module.exports = {
  register,
  login,
  resetPassword,
  logout,
  changeUserRole,
};
