import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const PortfolioGraph = ({ data }) => (
  <Paper sx={{ p: 2, flex: 1, minWidth: 0, height: 350 }}>
    <Typography variant="h6" gutterBottom>
      Portfolio Performance
    </Typography>
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="portfolioValue" stroke="#007bff" name="Portfolio Value" />
        <Line type="monotone" dataKey="benchmark" stroke="#82ca9d" name="Benchmark" />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);

export default PortfolioGraph; 