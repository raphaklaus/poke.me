const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const Cart = new Schema({
  pokemons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pokemon',
    required: true
  }],
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', Cart);
