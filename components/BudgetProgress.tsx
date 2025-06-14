import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BudgetProgressProps {
  theme: any;
  budget: number;
  budgetRemaining: number;
  expenses: number;
  formatCurrency: (amount: number) => string;
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({ 
  theme, 
  budget, 
  budgetRemaining, 
  expenses, 
  formatCurrency 
}) => {
  const styles = StyleSheet.create({
    budgetContainer: {
      marginTop: 16,
      padding: 16,
      backgroundColor: theme.inputBackground,
      borderRadius: 8,
    },
    budgetLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 4,
    },
    budgetRemaining: {
      fontSize: 14,
      marginBottom: 12,
    },
    budgetBar: {
      height: 8,
      backgroundColor: theme.border,
      borderRadius: 4,
      overflow: 'hidden',
    },
    budgetProgress: {
      height: '100%',
      borderRadius: 4,
    },
  });

  if (budget <= 0) return null;

  return (
    <View style={styles.budgetContainer}>
      <Text style={styles.budgetLabel}>
        Budget: {formatCurrency(budget)}
      </Text>
      <Text style={[
        styles.budgetRemaining,
        { color: budgetRemaining >= 0 ? theme.incomeColor : theme.expenseColor }
      ]}>
        Remaining: {formatCurrency(budgetRemaining)}
      </Text>
      <View style={styles.budgetBar}>
        <View 
          style={[
            styles.budgetProgress,
            { 
              width: `${Math.min((expenses / budget) * 100, 100)}%`,
              backgroundColor: expenses > budget ? theme.expenseColor : theme.incomeColor
            }
          ]} 
        />
      </View>
    </View>
  );
};