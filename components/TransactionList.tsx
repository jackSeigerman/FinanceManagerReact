import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../.expo/types/Transaction';
import { TransactionItem } from './TransactionItem';
import { EmptyTransactions } from './EmptyTransactions';

interface TransactionListProps {
  theme: any;
  transactions: Transaction[];
  onAddTransaction: () => void;
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string | null) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  theme,
  transactions,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction,
}) => {
  const styles = StyleSheet.create({
    transactionsContainer: {
      backgroundColor: theme.cardBackground,
      margin: 16,
      marginTop: 0,
      borderRadius: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    transactionsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 0,
    },
    addButton: {
      padding: 4,
    },
  });

  return (
    <View style={styles.transactionsContainer}>
      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={onAddTransaction}
        >
          <Ionicons name="add-circle" size={28} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <EmptyTransactions theme={theme} />
      ) : (
        transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            theme={theme}
            transaction={transaction}
            onEdit={onEditTransaction}
            onDelete={onDeleteTransaction}
          />
        ))
      )}
    </View>
  );
};