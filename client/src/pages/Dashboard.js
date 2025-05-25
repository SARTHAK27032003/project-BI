import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import SummaryCard from '../components/SummaryCard';
import PortfolioGraph from '../components/PortfolioGraph';
import AssetAllocationChart from '../components/AssetAllocationChart';

const Dashboard = () => {
  const { portfolio } = useSelector(state => state.portfolio);

  // Mock data for demonstration (replace with real data from backend as needed)
  const summaryData = [
    {
      title: 'Total Value',
      value: `$${portfolio?.totalValue?.toLocaleString() || '128,459.25'}`,
      change: '+2.4% since last month',
      changeColor: 'success.main',
    },
    {
      title: "Today's Gain/Loss",
      value: `+$${portfolio?.todayGainLoss?.toLocaleString() || '1,258.21'}`,
      change: '+0.98% since today',
      changeColor: 'success.main',
    },
    {
      title: 'Total ROI',
      value: `${portfolio?.roi || '28.46% '}`,
      change: '+1.2% since inception',
      changeColor: 'success.main',
    },
    {
      title: 'Cash Balance',
      value: `$${portfolio?.accountBalance?.toLocaleString() || '24,892.00'}`,
      change: '-1.3% since last month',
      changeColor: 'error.main',
    },
  ];

  const chartData = portfolio?.performance || [
    { date: '2023-02', portfolioValue: 105000, benchmark: 100000 },
    { date: '2023-03', portfolioValue: 107000, benchmark: 102000 },
    { date: '2023-04', portfolioValue: 110000, benchmark: 104000 },
    { date: '2023-05', portfolioValue: 120000, benchmark: 108000 },
    { date: '2023-06', portfolioValue: 108459, benchmark: 112000 },
  ];

  const assetAllocation = portfolio?.assetAllocation || [
    { name: 'Technology', value: 40 },
    { name: 'Finance', value: 25 },
    { name: 'Healthcare', value: 15 },
    { name: 'Consumer', value: 10 },
    { name: 'Other', value: 10 },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={600}>Investment Dashboard</Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 2 }}>Export</Button>
          <Button variant="contained" color="success">+ Add Investment</Button>
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {summaryData.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <SummaryCard {...item} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <PortfolioGraph data={chartData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <AssetAllocationChart data={assetAllocation} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 