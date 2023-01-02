const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUserDoc = await User({
      ...req.body,
      password: hashedPassword,
    });
    await newUserDoc.save();
    res.status(201).json(newUserDoc);
  } catch (err) {
    res.status(500).json({ message: "User can't be created" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: "Unable to get all the users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "User with that id doesn't exist" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User doesn't exist in the database" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ message: "Try logging in with correct credentials" });
    }
    const data = {
      user: {
        id: user.id, 
      },
    };
    const authToken = jwt.sign(data, process.env.SECRET_KEY);
    res.json({ success: true, authToken });  
  } catch (err) {
    res.status(500).json({ message: "User doesn't exist" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  userLogin,
};
