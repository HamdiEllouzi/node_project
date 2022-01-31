const postSchema = require('../models/post');
const userSchema = require('../models/user');
const mongoose = require('mongoose');

exports.createPost = (req, res, next) => {
  const objectId = new mongoose.Types.ObjectId(req.userId);
  const date = new Date();
  userSchema.findById(objectId).then((user) => {
    const newPost = new postSchema({
      userId: objectId,
      postContent: req.body.postContent,
      userName: `${user.userFirstName} ${user.userLastName}`,
      userPhoto: user.userImage,
      like: [],
      likeNumber: 0,
      publishDate: date,
      commentsNumber: 0,
    });
    newPost
      .save()
      .then(() => res.status(201).json({ message: 'post created' }))
      .catch((err) => res.status(400).json({ err }));
  });
};

exports.getPost = (req, res, next) => {
  postSchema
    .find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.deletePost = (req, res, next) => {
  const postId = req.query.postId;
  postSchema
    .findOne({ _id: postId })
    .then((post) => {
      if (post.userId.toString() != req.userId) {
        res.status(401).json({ message: 'request not authorized' });
      }
      postSchema
        .deleteOne({ _id: postId })
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

exports.handeLike = (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.userId);
  postSchema
    .findById(req.body.postId)
    .then((post) => {
      if (post.like.includes(userId)) {
        post.like.pull(userId);
        post.likeNumber -= 1;
        post
          .save()
          .then((post) => {
            res.status(201).json({ post, message: 'I like it' });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      } else {
        post.like.push(userId);
        post.likeNumber += 1;
        post
          .save()
          .then((post) => {
            res.status(201).json({ post, message: 'I dislike it' });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      }
    })
    .catch((err) => res.status(400).json({ err, message: 'wrong Post ID' }));
};
