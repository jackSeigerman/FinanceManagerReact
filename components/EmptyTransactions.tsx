import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyTransactionsProps {
  theme: any;
}

export const EmptyTransactions: React.FC<EmptyTransactionsProps> = ({ theme }) => {
  const styles = StyleSheet.create({
    emptyState: {
      alignItems: 'center',
      padding: 40,
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textSecondary,
      marginTop: 16,
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: theme.textTertiary,
      marginTop: 8,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.emptyState}>
      <Ionicons name="wallet-outline" size={64} color={theme.textTertiary} />
      <Text style={styles.emptyStateText}>No transactions yet</Text>
      <Text style={styles.emptyStateSubtext}>
        Tap the + button to add your first transaction
      </Text>
    </View>
  );
};