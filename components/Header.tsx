import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  theme: any;
  onSettingsPress: () => void;
  onBudgetPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onSettingsPress, onBudgetPress }) => {
  const styles = StyleSheet.create({
    header: {
      backgroundColor: theme.primary,
      paddingHorizontal: 20,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    headerButtons: {
      flexDirection: 'row',
      gap: 10,
    },
    headerButton: {
      padding: 5,
    },
  });

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Finance Manager</Text>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.headerButton} onPress={onSettingsPress}>
          <Ionicons name="settings" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={onBudgetPress}>
          <Ionicons name="wallet" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};