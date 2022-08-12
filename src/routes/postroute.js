const express = require('express');

const postrouter = express.Router();

const {
  getAllPost, getPosts, createPost, updatePost, deletePost,
} = require('../controllers/postcontroller');

const { userguard } = require('../middlewares/authmiddleware');
const { authguard } = require('../middlewares/adminauth');

postrouter.route('/').get(authguard, getAllPost).post(userguard, createPost);
postrouter.route('/:id').put(userguard, updatePost).delete(userguard, deletePost);
postrouter.route('/userpost').get(userguard, getPosts);

module.exports = postrouter;
