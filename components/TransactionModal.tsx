import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/theme';
import { Transaction } from '@/utils/Transaction';
import { Switch } from 'react-native';

interface TransactionModalProps {
  visible: boolean;
  onClose: () => void;
  currentTransaction: Transaction;
  setCurrentTransaction: (tx: Transaction) => void;
  onSave: () => void;
}

const categories = [
  { key: 'food', label: 'Food & Dining', icon: 'restaurant' },
  { key: 'transport', label: 'Transportation', icon: 'car' },
  { key: 'shopping', label: 'Shopping', icon: 'bag' },
  { key: 'entertainment', label: 'Entertainment', icon: 'game-controller' },
  { key: 'bills', label: 'Bills & Utilities', icon: 'receipt' },
  { key: 'health', label: 'Healthcare', icon: 'medical' },
  { key: 'income', label: 'Income', icon: 'cash' },
  { key: 'other', label: 'Other', icon: 'ellipsis-horizontal' },
];

const recurrenceOptions = [
  { key: 'daily', label: 'Daily' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' },
  { key: 'yearly', label: 'Yearly' },
];

const TransactionModal: React.FC<TransactionModalProps> = ({
  visible,
  onClose,
  currentTransaction,
  setCurrentTransaction,
  onSave,
}) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>        
        <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>          
          <View style={[styles.header, { borderBottomColor: theme.border }]}>            
            <Text style={[styles.title, { color: theme.text }]}>              
              {currentTransaction.id ? 'Edit Transaction' : 'Add Transaction'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <Text style={[styles.label, { color: theme.text }]}>Description</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
              value={currentTransaction.description}
              onChangeText={text => setCurrentTransaction({ ...currentTransaction, description: text })}
              placeholder="Enter description"
              placeholderTextColor={theme.textTertiary}
            />

            <Text style={[styles.label, { color: theme.text }]}>Amount</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
              value={
                isNaN(currentTransaction.amount) || currentTransaction.amount === null || currentTransaction.amount === undefined
                  ? ''
                  : currentTransaction.amount.toString()
              }
              onChangeText={text => {
                const parsed = parseFloat(text);
                setCurrentTransaction({
                  ...currentTransaction,
                  amount: text === '' ? 0 : parsed,
                });
              }}
              placeholder="0.00"
              placeholderTextColor={theme.textTertiary}
              keyboardType="numeric"
            />

            <Text style={[styles.label, { color: theme.text }]}>Type</Text>
            <View style={styles.typeContainer}>
              {['expense', 'income'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    currentTransaction.type === type && { backgroundColor: theme.primary, borderColor: theme.primary },
                  ]}
                  onPress={() => setCurrentTransaction({ ...currentTransaction, type: type as 'income' | 'expense' })}
                >
                  <Text
                    style={{
                      color: currentTransaction.type === type ? 'white' : theme.textSecondary,
                      fontWeight: currentTransaction.type === type ? '600' : '400',
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { color: theme.text }]}>Category</Text>
            <View style={styles.categoryContainer}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryButton,
                    currentTransaction.category === cat.key && { backgroundColor: theme.primary, borderColor: theme.primary },
                  ]}
                  onPress={() => setCurrentTransaction({ ...currentTransaction, category: cat.key })}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={20}
                    color={currentTransaction.category === cat.key ? 'white' : theme.textSecondary}
                  />
                  <Text
                    style={{
                      color: currentTransaction.category === cat.key ? 'white' : theme.textSecondary,
                      fontWeight: currentTransaction.category === cat.key ? '600' : '400',
                      marginLeft: 8,
                    }}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { color: theme.text }]}>Date</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
              value={currentTransaction.date}
              onChangeText={text => setCurrentTransaction({ ...currentTransaction, date: text })}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={theme.textTertiary}
            />
            <Text style={[styles.label, { color: theme.text }]}>Recurring</Text>
<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
  <Switch
    value={!!currentTransaction.isRecurring}
    onValueChange={value =>
      setCurrentTransaction({
        ...currentTransaction,
        isRecurring: value,
        recurrence: value ? 'monthly' : undefined,
        nextOccurrence: value ? currentTransaction.date : undefined,
      })
    }
    trackColor={{ false: theme.border, true: theme.primary }}
    thumbColor={currentTransaction.isRecurring ? theme.primary : theme.border}
  />
  <Text style={{ marginLeft: 12, color: theme.textSecondary }}>
    {currentTransaction.isRecurring ? 'Yes' : 'No'}
  </Text>
</View>

{currentTransaction.isRecurring && (
  <>
    <Text style={[styles.label, { color: theme.text }]}>Recurrence Frequency</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {recurrenceOptions.map(opt => (
        <TouchableOpacity
          key={opt.key}
          style={[
            styles.typeButton,
            currentTransaction.recurrence === opt.key && { backgroundColor: theme.primary, borderColor: theme.primary },
          ]}
          onPress={() =>
            setCurrentTransaction({
              ...currentTransaction,
              recurrence: opt.key as any,
            })
          }
        >
          <Text
            style={{
              color: currentTransaction.recurrence === opt.key ? 'white' : theme.textSecondary,
              fontWeight: currentTransaction.recurrence === opt.key ? '600' : '400',
            }}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <Text style={[styles.label, { color: theme.text }]}>End Date (optional)</Text>
    <TextInput
      style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
      value={currentTransaction.recurrenceEndDate || ''}
      onChangeText={text => setCurrentTransaction({ ...currentTransaction, recurrenceEndDate: text })}
      placeholder="YYYY-MM-DD"
      placeholderTextColor={theme.textTertiary}
    />
  </>
)}
          </ScrollView>

          <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.primary }]} onPress={onSave}>
            <Text style={styles.saveText}>{currentTransaction.id ? 'Update' : 'Add'} Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxHeight: '90%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
    maxHeight: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: '48%',
  },
  saveButton: {
    padding: 16,
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TransactionModal;
