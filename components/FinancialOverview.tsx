import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OverviewCard } from './OverviewCard';
import { BalanceCard } from './BalanceCard';
import { BudgetProgress } from './BudgetProgress';
import { formatCurrency } from '../utils/calculationUtils';

interface FinancialOverviewProps {
  theme: any;
  income: number;
  expenses: number;
  balance: number;
  budget: number;
  budgetRemaining: number;
}

export const FinancialOverview: React.FC<FinancialOverviewProps> = ({
  theme,
  income,
  expenses,
  balance,
  budget,
  budgetRemaining,
}) => {
  const styles = StyleSheet.create({
    overviewContainer: {
      backgroundColor: theme.cardBackground,
      margin: 16,
      padding: 20,
      borderRadius: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    overviewGrid: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
  });

  return (
    <View style={styles.overviewContainer}>
      <Text style={styles.sectionTitle}>Financial Overview</Text>
      
      <View style={styles.overviewGrid}>
        <OverviewCard
          theme={theme}
          icon="trending-up"
          label="Income"
          amount={formatCurrency(income)}
          color={theme.incomeColor}
        />
        <OverviewCard
          theme={theme}
          icon="trending-down"
          label="Expenses"
          amount={formatCurrency(expenses)}
          color={theme.expenseColor}
        />
      </View>

      <BalanceCard
        theme={theme}
        balance={balance}
        formatCurrency={formatCurrency}
      />

      <BudgetProgress
        theme={theme}
        budget={budget}
        budgetRemaining={budgetRemaining}
        expenses={expenses}
        formatCurrency={formatCurrency}
      />
    </View>
  );
};