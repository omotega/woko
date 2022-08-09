const mongoose = require('mongoose');

const postschema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'title s required'],
    },
    postedby: {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'User',
    },
    content: {
      type: String,
      required: [true, 'content is empty'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Post', postschema);
