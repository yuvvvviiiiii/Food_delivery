const mongoose = require('mongoose');

const cardDetailsSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: true
    },
    nameOnCard: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
    },
    cvc: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    }
})

module.exports = mongoose.model('CardDetails', cardDetailsSchema);