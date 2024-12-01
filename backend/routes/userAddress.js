const express = require('express');
const { isLoggedIn } = require('../middlewares/auth');
const User = require('../models/user');
const Address = require('../models/userAddress');

const router = express.Router();

router.post('/', isLoggedIn, async(req, res) => {
  try {
    const {state, city, pincode, phonenumber, fulladdress} = req.body;
    const user = await User.findOne({ email: req.user.email });
    const newAdd = await new Address({
      state,
      city,
      pincode,
      phonenumber,
      fulladdress,
      userId: user._id
    }).save();
    return res.status(200).json({message: "Address created successfully", id: newAdd._id});

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "error creating address" } );
  }
});

router.get('/', isLoggedIn, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const address = await Address.find({ userId: user._id });
    return res.status(200).json(address);
  } catch (error) {
    console.log(error);
  }
})

router.delete('/:id', isLoggedIn, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const address = await Address.findOne({ _id: req.params.id, userId: user._id});
    if(!address){
      return res.status(400).json({message: "Address not found"});
    } 
    await Address.findByIdAndDelete(req.params.id);
    return res.status(200).json({message: "Address deleted successfully", address});
    } catch (error) {
    console.log(error);
    res.status(500).json({message: "error deleting address" } );
  }
})

module.exports = router;