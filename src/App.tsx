import { useState, useEffect } from 'react';
import { 
  Container, 
  CssBaseline, 
  ThemeProvider, 
  createTheme, 
  Typography, 
  Box,
  AppBar,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ExpenseForm, ExpenseList, ExpenseSummary } from './components';
import { Expense } from './types';
import { mockExpenses, calculateExpenseSummary } from './data/mockData';
import './App.css';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Calculate summary whenever expenses change
  const summary = calculateExpenseSummary(expenses);

  // Handle adding or updating an expense
  const handleAddExpense = (expense: Expense) => {
    if (expenseToEdit) {
      // Update existing expense
      setExpenses(expenses.map(e => e.id === expense.id ? expense : e));
    } else {
      // Add new expense
      setExpenses([...expenses, expense]);
    }
  };

  // Handle editing an expense
  const handleEditExpense = (expense: Expense) => {
    setExpenseToEdit(expense);
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle deleting an expense
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Handle canceling an edit
  const handleCancelEdit = () => {
    setExpenseToEdit(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <AppBar position="static" sx={{ mb: 4 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Expense Splitter
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align={isSmallScreen ? 'center' : 'left'}>
              Track and Split Expenses
            </Typography>

            {/* Expense Form */}
            <ExpenseForm 
              onAddExpense={handleAddExpense} 
              expenseToEdit={expenseToEdit}
              onCancelEdit={handleCancelEdit}
            />

            {/* Expense Summary */}
            <ExpenseSummary summary={summary} />

            {/* Expense List */}
            <Typography variant="h5" gutterBottom>
              Expense History
            </Typography>
            <ExpenseList 
              expenses={expenses} 
              onEditExpense={handleEditExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App
