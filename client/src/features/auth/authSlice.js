import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { setAlert } from '../alert/alertSlice';

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch }) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      dispatch(setAlert('Registration successful', 'success'));
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
      }
      throw err;
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { dispatch }) => {
    try {
      const res = await axios.post('/api/auth/login', userData);
      dispatch(setAlert('Login successful', 'success'));
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
      }
      throw err;
    }
  }
);

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: true,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    loadUser: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  }
});

export const { logout, loadUser } = authSlice.actions;
export default authSlice.reducer; 