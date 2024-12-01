const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  state:{
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pincode:{
    type: String,
    required: true
  },
  phonenumber:{
    type: String,
    required: true
  },
  fulladdress:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Address', addressSchema);