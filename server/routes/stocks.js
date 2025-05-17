const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Stock = require('../models/Stock');
const axios = require('axios');

// @route   GET api/stocks
// @desc    Get all stocks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ symbol: 1 });
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/stocks/:symbol
// @desc    Get stock by symbol
// @access  Private
router.get('/:symbol', auth, async (req, res) => {
  try {
    const stock = await Stock.findOne({ symbol: req.params.symbol });
    if (!stock) {
      return res.status(404).json({ msg: 'Stock not found' });
    }
    res.json(stock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/stocks/update
// @desc    Update stock prices
// @access  Private
router.post('/update', auth, async (req, res) => {
  try {
    const { symbol, currentPrice, dayHigh, dayLow, openPrice, previousClose, volume, marketCap } = req.body;

    let stock = await Stock.findOne({ symbol });
    if (!stock) {
      return res.status(404).json({ msg: 'Stock not found' });
    }

    stock.currentPrice = currentPrice;
    stock.dayHigh = dayHigh;
    stock.dayLow = dayLow;
    stock.openPrice = openPrice;
    stock.previousClose = previousClose;
    stock.volume = volume;
    stock.marketCap = marketCap;
    stock.lastUpdated = Date.now();

    await stock.save();
    res.json(stock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/stocks/market/update
// @desc    Update all stock prices from market API
// @access  Private
router.get('/market/update', auth, async (req, res) => {
  try {
    // This is a placeholder for actual market API integration
    // You would need to implement the actual API call to NSE/BSE
    const response = await axios.get(`https://api.example.com/market-data`, {
      headers: {
        'Authorization': `Bearer ${process.env.MARKET_API_KEY}`
      }
    });

    const marketData = response.data;
    
    // Update each stock in the database
    for (const stockData of marketData) {
      await Stock.findOneAndUpdate(
        { symbol: stockData.symbol },
        {
          currentPrice: stockData.currentPrice,
          dayHigh: stockData.dayHigh,
          dayLow: stockData.dayLow,
          openPrice: stockData.openPrice,
          previousClose: stockData.previousClose,
          volume: stockData.volume,
          marketCap: stockData.marketCap,
          lastUpdated: Date.now()
        },
        { upsert: true }
      );
    }

    res.json({ msg: 'Market data updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 