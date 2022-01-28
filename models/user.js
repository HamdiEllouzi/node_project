const mongoose = require('mongoose');
const uniqueValidateur = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  userFirstName: {
    type: String,
    required: [true, ' First name must be provided'],
  },
  userLastName: {
    type: String,
    required: [true, ' Last name must be provided'],
  },
  userImage: String,
});

userSchema.plugin(uniqueValidateur);

module.exports = mongoose.model('User', userSchema);
