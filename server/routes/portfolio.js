const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');
const Stock = require('../models/Stock');

// @route   GET api/portfolio
// @desc    Get user's portfolio
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id }).populate('stocks.stock');
    
    if (!portfolio) {
      portfolio = new Portfolio({
        user: req.user.id,
        stocks: []
      });
      await portfolio.save();
    }

    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/portfolio/buy
// @desc    Buy stocks
// @access  Private
router.post('/buy', auth, async (req, res) => {
  try {
    const { symbol, quantity } = req.body;

    // Get stock details
    const stock = await Stock.findOne({ symbol });
    if (!stock) {
      return res.status(404).json({ msg: 'Stock not found' });
    }

    // Calculate total cost
    const totalCost = stock.currentPrice * quantity;

    // Get user's portfolio
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      portfolio = new Portfolio({
        user: req.user.id,
        stocks: []
      });
    }

    // Check if user already owns the stock
    const existingStock = portfolio.stocks.find(s => s.stock.toString() === stock._id.toString());
    
    if (existingStock) {
      // Update existing stock
      const newQuantity = existingStock.quantity + quantity;
      const newTotalInvestment = existingStock.totalInvestment + totalCost;
      existingStock.quantity = newQuantity;
      existingStock.averagePrice = newTotalInvestment / newQuantity;
      existingStock.totalInvestment = newTotalInvestment;
    } else {
      // Add new stock
      portfolio.stocks.push({
        stock: stock._id,
        quantity,
        averagePrice: stock.currentPrice,
        totalInvestment: totalCost
      });
    }

    // Update portfolio total value
    portfolio.totalValue = portfolio.stocks.reduce((total, stock) => {
      return total + (stock.quantity * stock.stock.currentPrice);
    }, 0);

    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/portfolio/sell
// @desc    Sell stocks
// @access  Private
router.post('/sell', auth, async (req, res) => {
  try {
    const { symbol, quantity } = req.body;

    // Get stock details
    const stock = await Stock.findOne({ symbol });
    if (!stock) {
      return res.status(404).json({ msg: 'Stock not found' });
    }

    // Get user's portfolio
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }

    // Find the stock in portfolio
    const existingStock = portfolio.stocks.find(s => s.stock.toString() === stock._id.toString());
    if (!existingStock) {
      return res.status(404).json({ msg: 'Stock not found in portfolio' });
    }

    if (existingStock.quantity < quantity) {
      return res.status(400).json({ msg: 'Insufficient quantity to sell' });
    }

    // Update stock quantity and investment
    existingStock.quantity -= quantity;
    existingStock.totalInvestment = existingStock.quantity * existingStock.averagePrice;

    // Remove stock if quantity becomes zero
    if (existingStock.quantity === 0) {
      portfolio.stocks = portfolio.stocks.filter(s => s.stock.toString() !== stock._id.toString());
    }

    // Update portfolio total value
    portfolio.totalValue = portfolio.stocks.reduce((total, stock) => {
      return total + (stock.quantity * stock.stock.currentPrice);
    }, 0);

    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 