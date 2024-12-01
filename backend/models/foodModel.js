const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model('FOOD', foodSchema);