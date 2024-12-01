const express = require('express');
const router = express.Router();
const Food = require('../models/foodModel');
const { isLoggedIn } = require('../middlewares/auth');

router.get('/', isLoggedIn, async (req, res) =>{
   try {

      const burger = await Food.find({ category: 'burger'});
      const fries = await Food.find({ category: 'fries'});
      const drinks = await Food.find({ category: 'colddrinks'});
      // console.log(result);
     res.status(200).json({
       message: 'All Products',
       burger,
       fries,
       drinks
     });
     
   } catch (error) {
    console.log(error);
    res.status(400).json({ message: "products error" });
   }

});

module.exports = router;