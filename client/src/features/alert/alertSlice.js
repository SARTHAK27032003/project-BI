import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const { msg, alertType } = action.payload;
      state.push({ msg, alertType, id: Date.now() });
    },
    removeAlert: (state, action) => {
      return state.filter(alert => alert.id !== action.payload);
    }
  }
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer; 