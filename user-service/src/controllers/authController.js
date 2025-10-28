const jwt = require('jsonwebtoken');
const userModel = require('../models/userModelDB');

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: process.env.JWT_EXPIRES || '1d'
  });
}

// 🧱 POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'All fields are required' });

    const exists = await userModel.findUserByEmail(email);
    if (exists)
      return res.status(400).json({ success: false, message: 'Email already registered' });

    const user = await userModel.createUser(name, email, password);
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { ...user, token }
    });
  } catch (err) {
    next(err);
  }
};

// 🧱 POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);
    if (!user)
      return res.status(400).json({ success: false, message: 'User not found' });

    const isMatch = await userModel.matchPassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { id: user.id, name: user.name, email: user.email, token }
    });
  } catch (err) {
    next(err);
  }
};

// 🧱 GET /api/auth/profile
exports.profile = async (req, res, next) => {
  try {
    const user = await userModel.findUserById(req.user.id);
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
