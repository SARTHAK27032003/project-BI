import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  MenuItem,
  Grid,
  Chip
} from '@mui/material';

// Sample data - Replace with actual API data
const transactions = [
  {
    id: 1,
    date: '2024-05-15',
    type: 'BUY',
    symbol: 'RELIANCE',
    quantity: 100,
    price: 2450.75,
    amount: 245075,
    status: 'COMPLETED'
  },
  {
    id: 2,
    date: '2024-05-14',
    type: 'SELL',
    symbol: 'TCS',
    quantity: 50,
    price: 3520.00,
    amount: 176000,
    status: 'COMPLETED'
  },
  {
    id: 3,
    date: '2024-05-13',
    type: 'BUY',
    symbol: 'HDFCBANK',
    quantity: 75,
    price: 1650.50,
    amount: 123787.50,
    status: 'COMPLETED'
  },
  {
    id: 4,
    date: '2024-05-12',
    type: 'BUY',
    symbol: 'INFY',
    quantity: 200,
    price: 1450.00,
    amount: 290000,
    status: 'COMPLETED'
  },
];

const Transactions = () => {
  const [filters, setFilters] = useState({
    type: 'ALL',
    symbol: '',
    startDate: '',
    endDate: '',
    status: 'ALL'
  });

  const handleFilterChange = (field) => (event) => {
    setFilters({
      ...filters,
      [field]: event.target.value
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    return (
      (filters.type === 'ALL' || transaction.type === filters.type) &&
      (filters.symbol === '' || transaction.symbol.includes(filters.symbol.toUpperCase())) &&
      (filters.status === 'ALL' || transaction.status === filters.status) &&
      (!filters.startDate || transaction.date >= filters.startDate) &&
      (!filters.endDate || transaction.date <= filters.endDate)
    );
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Transaction History
        </Typography>

        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Transaction Type"
              value={filters.type}
              onChange={handleFilterChange('type')}
            >
              <MenuItem value="ALL">All Types</MenuItem>
              <MenuItem value="BUY">Buy</MenuItem>
              <MenuItem value="SELL">Sell</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="Symbol"
              value={filters.symbol}
              onChange={handleFilterChange('symbol')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={filters.startDate}
              onChange={handleFilterChange('startDate')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={filters.endDate}
              onChange={handleFilterChange('endDate')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Status"
              value={filters.status}
              onChange={handleFilterChange('status')}
            >
              <MenuItem value="ALL">All Status</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="FAILED">Failed</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Transactions Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.type}
                      color={transaction.type === 'BUY' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{transaction.symbol}</TableCell>
                  <TableCell align="right">{transaction.quantity}</TableCell>
                  <TableCell align="right">₹{transaction.price.toLocaleString()}</TableCell>
                  <TableCell align="right">₹{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status}
                      color={transaction.status === 'COMPLETED' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Transactions; 