const mongoose = require('mongoose');

const myCartSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USER',
    required: true,
  },
  orders: [
    {
      category:{
        type: String,
        required: true,
      },
      productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FOOD',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      description:{
        type: String,
        required: true,
      },
      image:{
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    }
  ],
  totalPrice:{
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('MyCart', myCartSchema);