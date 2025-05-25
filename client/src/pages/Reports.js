import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data - Replace with actual API data
const monthlyReturns = [
  { month: 'Jan', return: 2.5 },
  { month: 'Feb', return: 3.2 },
  { month: 'Mar', return: -1.5 },
  { month: 'Apr', return: 4.1 },
  { month: 'May', return: 2.8 },
];

const sectorAllocation = [
  { name: 'Technology', value: 35 },
  { name: 'Finance', value: 25 },
  { name: 'Healthcare', value: 15 },
  { name: 'Energy', value: 10 },
  { name: 'Others', value: 15 },
];

const topPerformers = [
  { symbol: 'RELIANCE', return: 15.2, value: 252000 },
  { symbol: 'TCS', return: 12.8, value: 176000 },
  { symbol: 'HDFCBANK', return: 10.5, value: 126000 },
  { symbol: 'INFY', return: 8.7, value: 296000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Reports = () => {
  const [reportType, setReportType] = useState('monthly');
  const [timeRange, setTimeRange] = useState('6M');

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Report Controls */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', gap: 2 }}>
            <TextField
              select
              label="Report Type"
              value={reportType}
              onChange={handleReportTypeChange}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="monthly">Monthly Returns</MenuItem>
              <MenuItem value="sector">Sector Allocation</MenuItem>
              <MenuItem value="performance">Performance Analysis</MenuItem>
            </TextField>
            <TextField
              select
              label="Time Range"
              value={timeRange}
              onChange={handleTimeRangeChange}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="1M">1 Month</MenuItem>
              <MenuItem value="3M">3 Months</MenuItem>
              <MenuItem value="6M">6 Months</MenuItem>
              <MenuItem value="1Y">1 Year</MenuItem>
              <MenuItem value="YTD">Year to Date</MenuItem>
            </TextField>
            <Button variant="contained" color="primary">
              Download Report
            </Button>
          </Paper>
        </Grid>

        {/* Monthly Returns Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Returns
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReturns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="return" fill="#8884d8" name="Return %" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Sector Allocation */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sector Allocation
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sectorAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Top Performers */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Performing Stocks
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell align="right">Return</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topPerformers.map((stock) => (
                    <TableRow key={stock.symbol}>
                      <TableCell>{stock.symbol}</TableCell>
                      <TableCell align="right" sx={{ color: stock.return >= 0 ? 'success.main' : 'error.main' }}>
                        {stock.return}%
                      </TableCell>
                      <TableCell align="right">₹{stock.value.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Return (YTD)
              </Typography>
              <Typography variant="h4" color="success.main">
                +12.5%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Portfolio Value
              </Typography>
              <Typography variant="h4">
                ₹8,50,000
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Number of Holdings
              </Typography>
              <Typography variant="h4">
                15
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports; 