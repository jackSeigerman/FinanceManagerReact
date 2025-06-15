import React, { useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../.expo/types/Transaction';
import { useTheme } from '../hooks/useTheme';
import { calculateTotals } from '../utils/calculationUtils';
import { Header } from '../components/Header';
import { FinancialOverview } from '../components/FinancialOverview';
import { TransactionList } from '../components/TransactionList';
import { TypeSelector } from '../components/TypeSelector';
import { CategorySelector } from '../components/CategorySelector';

const FinanceManagerApp = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>({
    id: null,
    description: '',
    amount: '',
    type: 'expense',
    category: 'other',
    date: new Date().toISOString().split('T')[0],
  });
  const [budgetInput, setBudgetInput] = useState('');

  const theme = useTheme(isDarkMode);

  const addOrUpdateTransaction = () => {
    if (!currentTransaction.description || !currentTransaction.amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const amount = parseFloat(currentTransaction.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (currentTransaction.id) {
      setTransactions(prev => 
        prev.map(t => 
          t.id === currentTransaction.id 
            ? { ...currentTransaction, amount: amount.toString() }
            : t
        )
      );
    } else {
      const newTransaction = {
        ...currentTransaction,
        id: Date.now().toString(),
        amount: amount.toString(),
      };
      setTransactions(prev => [newTransaction, ...prev]);
    }

    setModalVisible(false);
    resetForm();
  };

  const editTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setModalVisible(true);
  };

  const deleteTransaction = (id: string | null) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setTransactions(prev => prev.filter(t => t.id !== id))
        },
      ]
    );
  };

  const resetForm = () => {
    setCurrentTransaction({
      id: null,
      description: '',
      amount: '',
      type: 'expense',
      category: 'other',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const setBudgetAmount = () => {
    const amount = parseFloat(budgetInput);
    if (isNaN(amount) || amount < 0) {
      Alert.alert('Error', 'Please enter a valid budget amount');
      return;
    }
    setBudget(amount);
    setBudgetModalVisible(false);
    setBudgetInput('');
  };

  const { income, expenses, balance, budgetRemaining } = calculateTotals(transactions, budget);

  const formatCurrency = (amount: string | number) => {
    return `$${parseFloat(amount.toString()).toFixed(2)}`;
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.overlay,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.cardBackground,
      width: '90%',
      maxHeight: '80%',
      borderRadius: 12,
      overflow: 'hidden',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
    },
    modalForm: {
      padding: 20,
      maxHeight: 400,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
      marginTop: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: theme.inputBackground,
      color: theme.text,
    },
    saveButton: {
      backgroundColor: theme.primary,
      padding: 16,
      alignItems: 'center',
    },
    saveButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    settingsModalContent: {
      padding: 20,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
     settingLabel: {
      fontSize: 16,
      color: theme.text,
      fontWeight: '500',
    },
    settingDescription: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 4,
    },
    currentBudgetText: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 12,
      textAlign: 'center',
    },
  });

}

export default FinanceManagerApp;