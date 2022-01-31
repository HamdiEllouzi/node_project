const mongoose = require('mongoose');

const commentScheam = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  comment: {
    type: String,
  },
  userName: String,
  userImage: String,
  date: Date,
});

module.exports = mongoose.model('Comments', commentScheam);
