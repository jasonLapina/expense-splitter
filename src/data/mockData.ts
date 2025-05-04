import { Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock data for the expense tracker application
export const mockExpenses: Expense[] = [
  {
    id: uuidv4(),
    date: new Date(2023, 11, 1), // December 1, 2023
    description: 'Grocery shopping',
    amount: 120.50,
    paidBy: 'Me',
    customSplit: false, // 50/50 split
  },
  {
    id: uuidv4(),
    date: new Date(2023, 11, 3), // December 3, 2023
    description: 'Dinner at restaurant',
    amount: 85.75,
    paidBy: 'Wife',
    customSplit: false, // 50/50 split
  },
  {
    id: uuidv4(),
    date: new Date(2023, 11, 5), // December 5, 2023
    description: 'Movie tickets',
    amount: 30.00,
    paidBy: 'Me',
    customSplit: false, // 50/50 split
  },
  {
    id: uuidv4(),
    date: new Date(2023, 11, 10), // December 10, 2023
    description: 'Wife\'s birthday gift',
    amount: 150.00,
    paidBy: 'Me',
    customSplit: true, // Custom split
    splitRatio: 100, // I pay 100%
  },
  {
    id: uuidv4(),
    date: new Date(2023, 11, 15), // December 15, 2023
    description: 'Utilities bill',
    amount: 200.00,
    paidBy: 'Wife',
    customSplit: false, // 50/50 split
  },
  {
    id: uuidv4(),
    date: new Date(2023, 11, 20), // December 20, 2023
    description: 'Home repairs',
    amount: 350.00,
    paidBy: 'Me',
    customSplit: true, // Custom split
    splitRatio: 70, // I pay 70%, Wife pays 30%
  },
  {
    id: uuidv4(),
    date: new Date(2023, 11, 25), // December 25, 2023
    description: 'Christmas dinner',
    amount: 180.25,
    paidBy: 'Wife',
    customSplit: false, // 50/50 split
  }
];

// Helper function to calculate expense summary
export const calculateExpenseSummary = (expenses: Expense[]) => {
  let totalExpenses = 0;
  let paidByMe = 0;
  let paidByWife = 0;
  let myShare = 0;
  let wifeShare = 0;

  expenses.forEach(expense => {
    totalExpenses += expense.amount;
    
    // Track who paid what
    if (expense.paidBy === 'Me') {
      paidByMe += expense.amount;
    } else {
      paidByWife += expense.amount;
    }
    
    // Calculate shares based on split type
    if (expense.customSplit && expense.splitRatio !== undefined) {
      // Custom split
      const myPortion = expense.amount * (expense.splitRatio / 100);
      const wifePortion = expense.amount - myPortion;
      
      myShare += myPortion;
      wifeShare += wifePortion;
    } else {
      // 50/50 split
      const halfAmount = expense.amount / 2;
      myShare += halfAmount;
      wifeShare += halfAmount;
    }
  });

  // Calculate who owes whom
  // Positive means "Me" owes "Wife", negative means "Wife" owes "Me"
  const balanceOwed = paidByWife - wifeShare;

  return {
    totalExpenses,
    paidByMe,
    paidByWife,
    myShare,
    wifeShare,
    balanceOwed
  };
};