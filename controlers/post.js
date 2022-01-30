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
      commentNumber: 0,
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
      console.log(req.userId);
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
