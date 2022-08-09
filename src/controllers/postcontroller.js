const Post = require('../models/postmodel');
const User = require('../models/usermodel');
const postservices = require('../services/postservices');

const getAllPost = async (req, res) => {
  const allpost = await Post.find({});
  res.status(200).json(allpost);
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error('please fill in the require field');
  }
  const newPost = await Post.create({
    title: req.body.title,
    content: req.body.content,
    // postedby: req.postedby.username,
    user: req.user.id,
  });
  res.status(201).json(newPost);
};

const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error('post not found');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('user not found');
  }

  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error('post not found');
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('user not found');
  }
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error('not authorized');
  }
  const deletedPost = await Post.deleteOne(post);
  res.status(200).json(post);
};

module.exports = {
  getAllPost,
  // getApost,
  createPost,
  updatePost,
  deletePost,
};
