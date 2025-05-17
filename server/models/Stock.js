const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  dayHigh: {
    type: Number,
    required: true
  },
  dayLow: {
    type: Number,
    required: true
  },
  openPrice: {
    type: Number,
    required: true
  },
  previousClose: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  marketCap: {
    type: Number,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stock', StockSchema); 