import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../.expo/types/Transaction';
import { getCategoryIcon, getCategoryLabel } from '../utils/categoryUtils';
import { formatCurrency } from '../utils/calculationUtils';

interface TransactionItemProps {
  theme: any;
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string | null) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  theme,
  transaction,
  onEdit,
  onDelete,
}) => {
  const styles = StyleSheet.create({
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    transactionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    categoryIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    transactionDetails: {
      flex: 1,
    },
    transactionDescription: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 4,
    },
    transactionCategory: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    transactionRight: {
      alignItems: 'flex-end',
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    transactionActions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      padding: 4,
    },
  });

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[
          styles.categoryIcon,
          { backgroundColor: transaction.type === 'income' ? '#e8f5e8' : '#ffebee' }
        ]}>
          <Ionicons 
            name={getCategoryIcon(transaction.category) as any} 
            size={20} 
            color={transaction.type === 'income' ? theme.incomeColor : theme.expenseColor} 
          />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionDescription}>
            {transaction.description}
          </Text>
          <Text style={styles.transactionCategory}>
            {getCategoryLabel(transaction.category)} • {transaction.date}
          </Text>
        </View>
      </View>
      
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          { color: transaction.type === 'income' ? theme.incomeColor : theme.expenseColor }
        ]}>
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </Text>
        <View style={styles.transactionActions}>
          <TouchableOpacity 
            onPress={() => onEdit(transaction)}
            style={styles.actionButton}
          >
            <Ionicons name="pencil" size={16} color={theme.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => onDelete(transaction.id)}
            style={styles.actionButton}
          >
            <Ionicons name="trash" size={16} color={theme.expenseColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};