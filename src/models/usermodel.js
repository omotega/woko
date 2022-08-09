const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'please first name is required'],
    },
    lastname: {
      type: String,
      required: [true, 'please lastname is required'],
    },
    email: {
      type: String,
      required: [true, 'please email is required'],
    },
    username: {
      type: String,
      unique: true,
      required: [true, 'please username is required'],
    },
    password: {
      type: String,
      required: [true, 'please password is required'],
    },
    role: {
      type: String,
      // enum: ['admin', 'user'],
      default: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
