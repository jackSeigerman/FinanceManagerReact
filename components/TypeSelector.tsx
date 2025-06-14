import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TypeSelectorProps {
  theme: any;
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  theme,
  selectedType,
  onTypeChange,
}) => {
  const styles = StyleSheet.create({
    typeContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    typeButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
      backgroundColor: theme.inputBackground,
    },
    typeButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    typeButtonText: {
      fontSize: 16,
      color: theme.textSecondary,
    },
    typeButtonTextActive: {
      color: 'white',
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.typeContainer}>
      <TouchableOpacity
        style={[
          styles.typeButton,
          selectedType === 'expense' && styles.typeButtonActive
        ]}
        onPress={() => onTypeChange('expense')}
      >
        <Text style={[
          styles.typeButtonText,
          selectedType === 'expense' && styles.typeButtonTextActive
        ]}>Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.typeButton,
          selectedType === 'income' && styles.typeButtonActive
        ]}
        onPress={() => onTypeChange('income')}
      >
        <Text style={[
          styles.typeButtonText,
          selectedType === 'income' && styles.typeButtonTextActive
        ]}>Income</Text>
      </TouchableOpacity>
    </View>
  );
};