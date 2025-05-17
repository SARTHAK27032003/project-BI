import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from '../alert/alertSlice';

// Async thunks
export const getStocks = createAsyncThunk(
  'stocks/getStocks',
  async (_, { dispatch }) => {
    try {
      const res = await axios.get('/api/stocks');
      return res.data;
    } catch (err) {
      dispatch(setAlert('Error fetching stocks', 'error'));
      throw err;
    }
  }
);

export const getStock = createAsyncThunk(
  'stocks/getStock',
  async (symbol, { dispatch }) => {
    try {
      const res = await axios.get(`/api/stocks/${symbol}`);
      return res.data;
    } catch (err) {
      dispatch(setAlert('Error fetching stock', 'error'));
      throw err;
    }
  }
);

export const updateStock = createAsyncThunk(
  'stocks/updateStock',
  async (stockData, { dispatch }) => {
    try {
      const res = await axios.post('/api/stocks/update', stockData);
      dispatch(setAlert('Stock updated successfully', 'success'));
      return res.data;
    } catch (err) {
      dispatch(setAlert('Error updating stock', 'error'));
      throw err;
    }
  }
);

const initialState = {
  stocks: [],
  currentStock: null,
  loading: false,
  error: null
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    clearCurrentStock: (state) => {
      state.currentStock = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload;
      })
      .addCase(getStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStock.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStock = action.payload;
      })
      .addCase(getStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.stocks = state.stocks.map(stock =>
          stock._id === action.payload._id ? action.payload : stock
        );
        state.currentStock = action.payload;
      });
  }
});

export const { clearCurrentStock } = stockSlice.actions;
export default stockSlice.reducer; 