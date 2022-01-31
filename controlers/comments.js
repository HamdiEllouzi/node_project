const commentSchema = require('../models/comments');
const mongoose = require('mongoose');
const userSchema = require('../models/user');
const postSchema = require('../models/post');
exports.getComments = (req, res, next) => {
  commentSchema
    .find({ postId: req.query.postId })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.createComment = (req, res) => {
  const userId = req.userId;
  const postId = req.body.postId;
  const date = new Date();
  postSchema
    .findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(401).json({ error: 'post not found' });
      }
      userSchema.findById(userId).then((user) => {
        const newComment = new commentSchema({
          userId: userId,
          comment: req.body.comment,
          postId: postId,
          userName: `${user.userFirstName} ${user.userLastName}`,
          userImage: user.userImage,
          date: date,
        });
        newComment
          .save()
          .then(() => {
            post.commentsNumber += 1;
            post
              .save()
              .then(() => {
                res.status(201).json({ message: 'comment created' });
              })
              .catch((error) => {
                res.status(500).json({ error });
              });
          })
          .catch((err) => res.status(400).json({ err }));
      });
    })
    .catch((err) => res.status(400).json({ err, message: 'wrong Post ID' }));
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.query.commentId;
  commentSchema
    .findOne({ _id: commentId })
    .then((comment) => {
      if (comment.userId.toString() != req.userId) {
        res.status(401).json({ message: 'request not authorized' });
      }
      commentSchema
        .deleteOne({ _id: commentId })
        .then(() => {
          res.status(200).json({
            message: 'Deleted!',
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    })
    .catch((err) => res.status(400).json({ message: 'error on delete', err }));
};
