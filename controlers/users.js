const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = new userSchema({
        email: req.body.email,
        password: hash,
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
      });
      newUser
        .save()
        .then(() => res.status(201).json({ message: 'user created' }))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.login = (req, res, next) => {
  userSchema
    .findOne({ email: req.body.email })
    .select('+password')
    .exec()
    .then((user) => {
      let utilisaeur = JSON.parse(JSON.stringify(user));
      delete utilisaeur.password;
      if (!user) {
        return res.status(401).json({ error: 'user not found' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'wrong password' });
          }
          res.status(201).json({
            utilisaeur,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((err) => res.status(500).json({ err: 'compare error' }));
    })
    .catch((err) => res.status(500).json({ err: 'find error' }));
};

exports.editeUser = (req, res) => {
  userSchema
    .findOneAndUpdate({ _id: req.body.userId }, req.body)
    .then((user) => {
      res.status(201).json({ message: 'user Updated' });
    })
    .catch((err) => res.status(500).json({ err: 'find error' }));
};
