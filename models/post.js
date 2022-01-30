const moongose = require('mongoose');

const postSchema = moongose.Schema({
  userId: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: String,
  postContent: {
    type: String,
    required: true,
  },
  userPhoto: String,
  commentsNumber: Number,
  like: {
    type: [moongose.Schema.Types.ObjectId],
    ref: 'User',
  },
  likeNumber: Number,
  publishDate: Date,
});

module.exports = moongose.model('Post', postSchema);
