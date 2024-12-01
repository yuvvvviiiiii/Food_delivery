const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

const register = async (req, res) => {
    
    const { name, email, phonenumber, password } = req.body;

    if(!name || !email || !phonenumber || !password){
      return res.status(400).json({ message: "All fields required" });
      }
      try {
        const isUserExist = await User.findOne({ email });

        if(isUserExist){
          res.status(400).json({ message: "Email Already taken" });
          return;
        } else {
          const hashedPassword = bcrypt.hashSync(password, 10);

          const newUser = await new User({
            name,
            email,
            phonenumber,
            password: hashedPassword
          }).save();
          const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {expiresIn: "10h" });

          return res.status(201).json({ message: "User Successfully Created", token, id: newUser._id, userName: newUser.name });
        }


        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "server error" });
      }
}


const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    try {
      const user = await User.findOne({ email });
      if(!user){
        return res.status(400).json({ message: "Invalid Email" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      if(!isPasswordCorrect){
        res.status(400).json({ message: "invalid password" });
        return;
      }
  
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "10h" });
      return res.status(200).json({ message: "login successful", token, id: user._id, userName: user.name });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server error" });
    }
};

const getUser = async(req, res) => 
  {
    try {
      const user = await User.find({ email: req.user.email });
      if(user){
      return res.status(200).json({message: "user found", user});
    } else {
      return res.status(404).json({ message: "user not found" });
    }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "server error" });
    }
  }

const updateUser = async(req, res) => {
  try {
    
    const { name, email, phonenumber, gender, country} = req.body;
    const user = await User.findOne({ email: req.user.email });

    if(!user){
      return res.status(404).json({ message: "user not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, { name, email, phonenumber, gender, country });

    return res.status(200).json({message: "user updated successfully", ...updatedUser});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

module.exports = { register, login, getUser, updateUser };
