import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from '../alert/alertSlice';

// Async thunks
export const getWatchlist = createAsyncThunk(
  'watchlist/getWatchlist',
  async (_, { dispatch }) => {
    try {
      const res = await axios.get('/api/watchlist');
      return res.data;
    } catch (err) {
      dispatch(setAlert('Error fetching watchlist', 'error'));
      throw err;
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  'watchlist/addToWatchlist',
  async (symbol, { dispatch }) => {
    try {
      const res = await axios.post('/api/watchlist', { symbol });
      dispatch(setAlert('Stock added to watchlist', 'success'));
      return res.data;
    } catch (err) {
      dispatch(setAlert('Error adding to watchlist', 'error'));
      throw err;
    }
  }
);

export const removeFromWatchlist = createAsyncThunk(
  'watchlist/removeFromWatchlist',
  async (symbol, { dispatch }) => {
    try {
      const res = await axios.delete(`/api/watchlist/${symbol}`);
      dispatch(setAlert('Stock removed from watchlist', 'success'));
      return res.data;
    } catch (err) {
      dispatch(setAlert('Error removing from watchlist', 'error'));
      throw err;
    }
  }
);

const initialState = {
  watchlist: [],
  loading: false,
  error: null
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    clearWatchlist: (state) => {
      state.watchlist = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWatchlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
      })
      .addCase(getWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.watchlist = action.payload;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.watchlist = action.payload;
      });
  }
});

export const { clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer; 