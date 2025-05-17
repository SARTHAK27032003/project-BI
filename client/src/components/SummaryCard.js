import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const SummaryCard = ({ title, value, change, changeColor, subtitle }) => (
  <Card sx={{ minWidth: 200, m: 1 }}>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" component="div">
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
      {change !== undefined && (
        <Box mt={1}>
          <Typography variant="body2" color={changeColor || 'text.primary'}>
            {change}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

export default SummaryCard; 