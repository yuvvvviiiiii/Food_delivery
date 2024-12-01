const express = require('express');
const env = require('dotenv');
env.config();
const mongoose = require('mongoose');
const cors = require('cors');


const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const  addressRouter = require('./routes/userAddress');
const cardDetailsRouter = require('./routes/cardDetails');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_DB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use('/api/user', userRouter);
app.use('/api/home', homeRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/card-details', cardDetailsRouter)


app.get('/', (req, res) => {
  return res.send('Hello from server');
})


app.listen(PORT, () => {
  console.log(`server started at PORT: ${PORT}`);

  mongoose.connect(MONGO_URL)
  .then(() => {
      console.log('connected to mongoDB');
    }).catch((error) => {
      console.log(`server error`, error);
    })
})