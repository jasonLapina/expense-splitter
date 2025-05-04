import React from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses, 
  onEditExpense, 
  onDeleteExpense 
}) => {
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // If there are no expenses, show a message
  if (expenses.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" align="center">
          No expenses recorded yet. Add your first expense using the form above.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table aria-label="expense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Paid By</TableCell>
            <TableCell>Split</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{format(expense.date, 'MMM d, yyyy')}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell align="right">{formatCurrency(expense.amount)}</TableCell>
              <TableCell>{expense.paidBy}</TableCell>
              <TableCell>
                {expense.customSplit 
                  ? `Custom (Me: ${expense.splitRatio}%, Wife: ${100 - (expense.splitRatio || 0)}%)`
                  : '50/50'}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton 
                    aria-label="edit" 
                    onClick={() => onEditExpense(expense)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton 
                    aria-label="delete" 
                    onClick={() => onDeleteExpense(expense.id)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;