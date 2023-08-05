const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const userSignupSchema = require('../schema/userModel');

app.use(express.json());

const jwtSecretKey = process.env.SECRET_KEY;

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSignupSchema.findOne({ email });

    if (!user) {
      return res.json({ message: 'Invalid credentials', success: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ message: 'Invalid credentials', success: false });
    }

    // Create a JWT token with the user's email as the payload
    const token = jwt.sign({ email: user.email }, jwtSecretKey);

    res.json({ message: 'Welcome', success: true, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
});

module.exports = app;
