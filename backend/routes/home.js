const express = require('express');
const env = require('dotenv').config();
const images = require('../images/images');

const router = express.Router();


router.get('/', (req, res) => {
  try {
    res.status(200).json({
      message: 'Welcome to the Home Page',
      images 
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;