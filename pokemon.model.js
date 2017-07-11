const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const Pokemon = new Schema({
  number: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pokemon', Pokemon);
