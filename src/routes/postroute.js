const express = require('express');

const postrouter = express.Router();

const {
  getAllPost, createPost, updatePost, deletePost,
} = require('../controllers/postcontroller');

const { protect } = require('../middlewares/authmiddleware');
const { authguard } = require('../middlewares/adminauth');

postrouter.route('/').get(authguard, getAllPost).post(protect, createPost);
postrouter.route('/:id').put(protect, updatePost).delete(protect, deletePost);

module.exports = postrouter;
