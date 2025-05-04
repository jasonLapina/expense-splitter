import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Divider, 
  Grid, 
  Paper, 
  Typography 
} from '@mui/material';
import { ExpenseSummary as ExpenseSummaryType } from '../types';

interface ExpenseSummaryProps {
  summary: ExpenseSummaryType;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ summary }) => {
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Determine who owes whom
  const getBalanceText = () => {
    if (summary.balanceOwed === 0) {
      return "All settled up! No one owes anything.";
    } else if (summary.balanceOwed > 0) {
      return `I owe my wife ${formatCurrency(summary.balanceOwed)}`;
    } else {
      return `My wife owes me ${formatCurrency(Math.abs(summary.balanceOwed))}`;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Expense Summary
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Total Expenses
              </Typography>
              <Typography variant="h4">
                {formatCurrency(summary.totalExpenses)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Payment Breakdown
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">I paid:</Typography>
                  <Typography variant="h6">{formatCurrency(summary.paidByMe)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Wife paid:</Typography>
                  <Typography variant="h6">{formatCurrency(summary.paidByWife)}</Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">My share:</Typography>
                  <Typography variant="h6">{formatCurrency(summary.myShare)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Wife's share:</Typography>
                  <Typography variant="h6">{formatCurrency(summary.wifeShare)}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: 'primary.main', 
              color: 'primary.contrastText',
              borderRadius: 1,
              textAlign: 'center'
            }}
          >
            <Typography variant="h5">
              {getBalanceText()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExpenseSummary;