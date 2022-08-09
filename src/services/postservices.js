const Post = require('../models/postmodel');
const User = require('../models/usermodel');

class Postservices {
  static async getAllPosts() {
    const allposts = await Post.find({});
    return allposts;
  }
}

module.exports = new Postservices();
