
// const products = require('./products/products');
// const Food = require('./models/foodModel');

const products = [
    {
      name: 'Royal Cheese Burger with extra Fries',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium',
      price: '₹ 120',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732358072/pucwctb19rkdujl6hihv.png',
      category: 'burger'

    },
    {
      name: 'The classics for 3',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
      price:'₹ 120',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732358163/dsibnapaxumiyymyfnuu.png',
      category: 'burger'
    },
    {
      name: 'The classics for 3',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
      price:'₹ 120',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732358171/denetnptmd9l8iojbrly.png',
      category: 'burger'
    },
    {
      name: 'The classics for 3',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
      price:'₹ 120',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732358010/xlcdpi4ay2qrhhav9jht.png',
      category: 'burger'
    },
  
 
    {
      name: 'Royal Cheese Burger with extra Fries',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium',
      price: '₹ 70',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732358967/saqobg8r0dmwnd5fgbo3.png',
      category: 'fries'
    },
    {
      name: 'The classics for 3',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
      price:'₹ 70',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732359063/wbvvs5synwitfuiypaht.png',
      category: 'fries'
    },
    {
      name: 'The classics for 3',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
      price:'₹ 70',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732359097/y8vrd2ccee8chtv3qbzy.png',
      category: 'fries'
    },
    {
      name: 'The classics for 3',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
      price:'₹ 70',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732359108/rcfq9tykwwikdfqtqaxj.png',
      category: 'fries'
    },
  
    {
      name: 'Royal Cheese Burger with extra Fries',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium',
      price: '₹ 40',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732359329/hmgvfvkdkvzhimxxecrm.png',
      category: 'colddrinks'
    },
    {
      name: 'The classics for 3',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
      price:'₹ 40',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732359356/r0gddew7ttblr5atnoiv.png',
      category: 'colddrinks'
    },
    {
      name: 'The classics for 3',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
      price:'₹ 40',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732359386/yrh8opdtw2u09omgcn9r.png',
      category: 'colddrinks'
    },
    {
      name: 'The classics for 3',
      description: '1 McChicken™, 1 Big Mac™,  1 Royal Cheeseburger, 3 medium sized French Fries , 3 cold drinks',
      price:'₹ 40',
      image: 'https://res.cloudinary.com/dfbxbhmci/image/upload/v1732359460/m643gpsb78et4vhszsrd.png',
      category: 'colddrinks'
    }, 
  ]
 

  // function to add food items in the database

  // const addProduct = async (product) => {
  //   try{
  //     const existingProduct = await Food.findOne({ image: product.image });
  //     if(existingProduct){
  //       console.log('product already exists');
  //       return;
  //     }
  
  //     const newFood = new Food(product);
  //     await newFood.save();
  //     console.log('product added' , newFood.name);
  
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  // const addProducts = async () => {
  //   try {
  //     for(const product of products){
  //       await addProduct(product);
  //     }
  //     console.log('All products added');
  //   } catch (error) {
  //     console.log(error, 'error adding products');
  // }
  // }
  // addProducts();

  // module.exports = products;