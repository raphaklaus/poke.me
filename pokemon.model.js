const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const Pokemon = new Schema({
  number: {
    type: Number,
    required: true,
    min: 1,
    max: 151
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
    required: true,
    min: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pokemon', Pokemon);
