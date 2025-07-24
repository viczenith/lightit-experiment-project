const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Register (works as‑is)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already in use' });

    user = await User.create({ name, email, password, role });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });
    res.status(201).json({ token, user: { id: user._id, name, email, role } });
  } catch (err) {
    console.error('POST /api/auth/register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login (works as‑is)
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.TOKEN_EXPIRES_IN
//     });
//     res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
//   } catch (err) {
//     console.error('POST /api/auth/login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      console.log('No user with that email');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email, role: user.role }
    });
  } catch (err) {
    console.error('POST /api/auth/login error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
});


// — Admin only: list all users
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('GET /api/auth/users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// — Admin only: change user role// DISABLED
router.put('/users/:id/role', protect, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = role;
    await user.save();
    res.json({ id: user._id, name: user.name, email: user.email, role });
  } catch (err) {
    console.error('PUT /api/auth/users/:id/role error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// — Admin only: delete user
router.delete('/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /api/auth/users/:id error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Student: toggle bookmark
router.post(
  '/bookmark/:experimentId',
  protect,
  async (req, res) => {
    const expId = req.params.experimentId;
    try {
      const user = await User.findById(req.user._id);
      user.bookmarks = user.bookmarks || [];
      const idx = user.bookmarks.findIndex(id => id.toString() === expId);
      if (idx === -1) {
        user.bookmarks.push(expId);
      } else {
        user.bookmarks.splice(idx, 1);
      }
      await user.save();
      // Return user minus sensitive
      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bookmarks: user.bookmarks
        }
      });
    } catch (err) {
      console.error('POST /api/auth/bookmark/:experimentId error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
