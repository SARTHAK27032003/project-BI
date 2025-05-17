const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/watchlist
// @desc    Get user's watchlist
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('watchlist');
    res.json(user.watchlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/watchlist
// @desc    Add stock to watchlist
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { symbol } = req.body;

    const user = await User.findById(req.user.id);
    if (!user.watchlist.includes(symbol)) {
      user.watchlist.push(symbol);
      await user.save();
    }

    res.json(user.watchlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/watchlist/:symbol
// @desc    Remove stock from watchlist
// @access  Private
router.delete('/:symbol', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.watchlist = user.watchlist.filter(symbol => symbol !== req.params.symbol);
    await user.save();

    res.json(user.watchlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 