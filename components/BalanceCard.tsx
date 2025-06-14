import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BalanceCardProps {
  theme: any;
  balance: number;
  formatCurrency: (amount: number) => string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ theme, balance, formatCurrency }) => {
  const styles = StyleSheet.create({
    balanceContainer: {
      marginTop: 8,
    },
    balanceCard: {
      backgroundColor: theme.inputBackground,
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    balanceLabel: {
      fontSize: 16,
      color: theme.textSecondary,
      marginBottom: 8,
    },
    balanceAmount: {
      fontSize: 28,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.balanceContainer}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={[
          styles.balanceAmount, 
          { color: balance >= 0 ? theme.incomeColor : theme.expenseColor }
        ]}>
          {formatCurrency(balance)}
        </Text>
      </View>
    </View>
  );
};