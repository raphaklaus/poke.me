const crypto = require('crypto'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

User.pre('save', function(next) {
  this.password = crypto.createHmac('sha256', process.env.PASSWORD_SECRET)
  .update(this.password)
  .digest('hex');
  next();
});

User.index({ username: true }, { unique: true });

module.exports = mongoose.model('User', User);
