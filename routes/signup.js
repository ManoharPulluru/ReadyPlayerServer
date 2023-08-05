const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const userSignupSchema = require('../schema/userModel');

app.use(express.json());

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userSignupSchema.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists', success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userSignupSchema({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ message: 'New user created', success: true });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
});
module.exports = app;
