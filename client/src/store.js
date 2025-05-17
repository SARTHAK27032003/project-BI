import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import stockReducer from './features/stocks/stockSlice';
import portfolioReducer from './features/portfolio/portfolioSlice';
import watchlistReducer from './features/watchlist/watchlistSlice';
import alertReducer from './features/alert/alertSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stocks: stockReducer,
    portfolio: portfolioReducer,
    watchlist: watchlistReducer,
    alert: alertReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
}); 