import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from '../alert/alertSlice';

// Async thunks
export const getPortfolio = createAsyncThunk(
  'portfolio/getPortfolio',
  async (_, { dispatch }) => {
    try {
      const res = await axios.get('/api/portfolio');
      return res.data;
    } catch (err) {
      dispatch(setAlert('Error fetching portfolio', 'error'));
      throw err;
    }
  }
);

export const buyStock = createAsyncThunk(
  'portfolio/buyStock',
  async (stockData, { dispatch }) => {
    try {
      const res = await axios.post('/api/portfolio/buy', stockData);
      dispatch(setAlert('Stock purchased successfully', 'success'));
      return res.data;
    } catch (err) {
      dispatch(setAlert('Error purchasing stock', 'error'));
      throw err;
    }
  }
);

export const sellStock = createAsyncThunk(
  'portfolio/sellStock',
  async (stockData, { dispatch }) => {
    try {
      const res = await axios.post('/api/portfolio/sell', stockData);
      dispatch(setAlert('Stock sold successfully', 'success'));
      return res.data;
    } catch (err) {
      dispatch(setAlert('Error selling stock', 'error'));
      throw err;
    }
  }
);

const initialState = {
  portfolio: null,
  loading: false,
  error: null
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    clearPortfolio: (state) => {
      state.portfolio = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolio.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolio = action.payload;
      })
      .addCase(getPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(buyStock.fulfilled, (state, action) => {
        state.portfolio = action.payload;
      })
      .addCase(sellStock.fulfilled, (state, action) => {
        state.portfolio = action.payload;
      });
  }
});

export const { clearPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer; 