// TypeScript interfaces for the expense tracker application

// Person who paid or is involved in the expense
export type Person = 'Me' | 'Wife';

// Interface for an expense entry
export interface Expense {
  id: string;
  date: Date;
  description: string;
  amount: number;
  paidBy: Person;
  // If customSplit is false, the split is 50/50
  // If customSplit is true, use the splitRatio
  customSplit: boolean;
  // splitRatio represents the percentage (0-100) that "Me" should pay
  // e.g., if splitRatio is 70, "Me" pays 70% and "Wife" pays 30%
  splitRatio?: number;
}

// Interface for expense summary
export interface ExpenseSummary {
  totalExpenses: number;
  paidByMe: number;
  paidByWife: number;
  myShare: number;
  wifeShare: number;
  // Positive means "Me" owes "Wife", negative means "Wife" owes "Me"
  balanceOwed: number;
}