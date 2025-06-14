import { Transaction } from '../.expo/types/Transaction';

export const calculateTotals = (transactions: Transaction[], budget: number) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const balance = income - expenses;
  const budgetRemaining = budget - expenses;
  
  return { income, expenses, balance, budgetRemaining };
};

export const formatCurrency = (amount: string | number): string => {
  return `$${parseFloat(amount.toString()).toFixed(2)}`;
};