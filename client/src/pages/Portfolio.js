import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Sample data - Replace with actual API data
const holdings = [
  { symbol: 'RELIANCE', quantity: 100, avgPrice: 2450.75, currentPrice: 2520.00, value: 252000, change: 2.82 },
  { symbol: 'TCS', quantity: 50, avgPrice: 3450.25, currentPrice: 3520.00, value: 176000, change: 2.02 },
  { symbol: 'HDFCBANK', quantity: 75, avgPrice: 1650.50, currentPrice: 1680.00, value: 126000, change: 1.79 },
  { symbol: 'INFY', quantity: 200, avgPrice: 1450.00, currentPrice: 1480.00, value: 296000, change: 2.07 },
];

const performanceData = [
  { date: '2024-01', value: 850000 },
  { date: '2024-02', value: 865000 },
  { date: '2024-03', value: 880000 },
  { date: '2024-04', value: 895000 },
  { date: '2024-05', value: 910000 },
];

const assetAllocation = [
  { name: 'Equities', value: 60 },
  { name: 'Bonds', value: 25 },
  { name: 'Cash', value: 10 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Portfolio = () => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalInvestment = holdings.reduce((sum, holding) => sum + (holding.avgPrice * holding.quantity), 0);
  const totalProfit = totalValue - totalInvestment;
  const profitPercentage = ((totalProfit / totalInvestment) * 100).toFixed(2);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Portfolio Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Portfolio Value
              </Typography>
              <Typography variant="h4">
                ₹{totalValue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Investment
              </Typography>
              <Typography variant="h4">
                ₹{totalInvestment.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Profit/Loss
              </Typography>
              <Typography variant="h4" color={totalProfit >= 0 ? 'success.main' : 'error.main'}>
                ₹{totalProfit.toLocaleString()} ({profitPercentage}%)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Holdings Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Holdings
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Avg. Price</TableCell>
                    <TableCell align="right">Current Price</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell align="right">Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holdings.map((holding) => (
                    <TableRow key={holding.symbol}>
                      <TableCell>{holding.symbol}</TableCell>
                      <TableCell align="right">{holding.quantity}</TableCell>
                      <TableCell align="right">₹{holding.avgPrice.toLocaleString()}</TableCell>
                      <TableCell align="right">₹{holding.currentPrice.toLocaleString()}</TableCell>
                      <TableCell align="right">₹{holding.value.toLocaleString()}</TableCell>
                      <TableCell align="right" sx={{ color: holding.change >= 0 ? 'success.main' : 'error.main' }}>
                        {holding.change}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Performance
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" name="Portfolio Value" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Asset Allocation */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Asset Allocation
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Portfolio; 