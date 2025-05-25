import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { addToWatchlist } from '../features/watchlist/watchlistSlice';

const Market = () => {
  const dispatch = useDispatch();
  const [stocks, setStocks] = useState([]);
  const { watchlist } = useSelector(state => state.watchlist);

  useEffect(() => {
    // Fetch stocks from backend
    // For now, using mock data
    const mockStocks = [
      { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2500, change: 2.5 },
      { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3500, change: -1.2 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1500, change: 0.8 },
      { symbol: 'INFY', name: 'Infosys', price: 1800, change: 1.5 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 900, change: -0.5 },
    ];
    setStocks(mockStocks);
  }, []);

  const handleAddToWatchlist = (stock) => {
    dispatch(addToWatchlist(stock));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>Market</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Change (%)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>₹{stock.price.toLocaleString()}</TableCell>
                <TableCell sx={{ color: stock.change >= 0 ? 'success.main' : 'error.main' }}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddToWatchlist(stock)}
                    disabled={watchlist.some(item => item.symbol === stock.symbol)}
                  >
                    {watchlist.some(item => item.symbol === stock.symbol) ? 'Added' : 'Add to Watchlist'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Market; 