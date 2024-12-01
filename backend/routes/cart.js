const express = require('express');
const Mycart = require('../models/myCart');
const { isLoggedIn } = require('../middlewares/auth');

const User = require('../models/user');
const router = express.Router();

router.post('/order',isLoggedIn, async(req, res) => {
  try {
    const {userId, orders, totalPrice} = req.body;
  
    if(!userId || !orders || !totalPrice){
      return res.status(400).json({message: 'All fields are required'});
    }
    else{
      const processedOrders = orders.map(order => ({
        category: order.category,
        productId: order._id,
        name: order.name,
        price: order.price,
        description: order.description,
        image: order.image,
        quantity: order.quantity
      }));
  
  
      const newCart = new Mycart({
        userId,
        orders: processedOrders,
        totalPrice
      });
    
      const order = await newCart.save();
      res.status(200).json({message: "order placed successfully", order});
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "error creating cart" } );
  }
});

router.get('/my-orders',isLoggedIn, async(req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const ordersPlaced = await Mycart.find({ userId: user._id });
    if(ordersPlaced){
      res.status(200).json(ordersPlaced);
    } else{
      res.status(404).json({message: "no orders found"});
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "error getting orders"});
  }
})

module.exports = router;
