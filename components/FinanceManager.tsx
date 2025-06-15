import React from 'react';
import { ScrollView } from 'react-native';
import Header from "./Header";
import Overview from './Overview';
import TransactionsList from './TransactionsList';
import TransactionModal from './TransactionModal';
import BudgetModal from './BudgetModal';
import SettingsModal from './SettingsModal';
import { useTransactions } from '../hooks/useTransactions';
import { useTheme } from '../styles/theme';

const FinanceManager = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const {
    transactions,
    budget,
    modalVisible,
    setModalVisible,
    budgetModalVisible,
    setBudgetModalVisible,
    settingsModalVisible,
    setSettingsModalVisible,
    ...transactionHandlers
  } = useTransactions();

  return (
    <>
      <Header
        onOpenSettings={() => setSettingsModalVisible(true)}
        onOpenBudget={() => setBudgetModalVisible(true)}
      />

      <ScrollView>
        <Overview transactions={transactions} budget={budget} />
        <TransactionsList
          transactions={transactions}
          onEdit={transactionHandlers.editTransaction}
          onDelete={transactionHandlers.deleteTransaction}
          onAdd={() => setModalVisible(true)}
        />
      </ScrollView>

      <TransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        {...transactionHandlers}
        onSave={() => transactionHandlers.addOrUpdateTransaction()}
      />

      <BudgetModal
        visible={budgetModalVisible}
        onClose={() => setBudgetModalVisible(false)}
        setBudget={transactionHandlers.setBudget}
        currentBudget={budget}
      />

      <SettingsModal
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={toggleTheme}
      />
    </>
  );
};

export default FinanceManager;