const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  city: String,
});

module.exports = mongoose.model('usermodel', UserSchema);
