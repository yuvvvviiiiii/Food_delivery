const express = require('express');
const { isLoggedIn } = require('../middlewares/auth');
const User = require('../models/user');
const CardDetails = require('../models/cardDetails');
const router = express.Router();

router.post('/', isLoggedIn, async(req, res) => {
  try {
    const { cardNumber,nameOnCard,expiration, cvc } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const newCard = await new CardDetails({
      cardNumber,
      nameOnCard,
      expiryDate: expiration,
      cvc,
      userId: user._id
    }).save();
    return res.status(200).json({message: "Card details created successfully", newCard});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "error creating card details" } );
  }
})

router.get('/', isLoggedIn, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if(!user){
      return res.status(400).json({message: "user not found"});
    }
    const cardDetails = await CardDetails.find({ userId: user._id });
    return res.status(200).json(cardDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "error getting card details" } );
  }
})

router.put('/:id', async(req, res) => {
  try {
    const { cardNumber, nameOnCard, expiration, cvc } = req.body;
    const updatedCard = await CardDetails.findByIdAndUpdate(req.params.id, {
      cardNumber,
      nameOnCard,
      expiryDate: expiration,
      cvc
    }, { new: true });
    return res.status(200).json({message: "Card details updated successfully", updatedCard});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "error updating card details" } );
  }
})

router.delete('/:id', isLoggedIn, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const card = await CardDetails.findOne({ _id: req.params.id, userId: user._id});
    if(!card){
      return res.status(400).json({message: "Card not found"});
    }
    await CardDetails.findByIdAndDelete(req.params.id);
    return res.status(200).json({message: "Card deleted successfully", card});  
  } catch (error) {
    
  }
})

module.exports = router;