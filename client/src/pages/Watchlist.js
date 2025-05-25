import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { removeFromWatchlist } from '../features/watchlist/watchlistSlice';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector(state => state.watchlist);

  const handleRemoveFromWatchlist = (symbol) => {
    dispatch(removeFromWatchlist(symbol));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>Watchlist</Typography>
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
            {watchlist.map((stock) => (
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
                    color="error"
                    size="small"
                    onClick={() => handleRemoveFromWatchlist(stock.symbol)}
                  >
                    Remove
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

export default Watchlist; 