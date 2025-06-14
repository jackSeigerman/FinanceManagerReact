import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OverviewCardProps {
  theme: any;
  icon: string;
  label: string;
  amount: string;
  color: string;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ 
  theme, 
  icon, 
  label, 
  amount, 
  color 
}) => {
  const styles = StyleSheet.create({
    overviewCard: {
      flex: 1,
      backgroundColor: theme.inputBackground,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    overviewLabel: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 8,
      marginBottom: 4,
    },
    overviewAmount: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.overviewCard}>
      <Ionicons name={icon as any} size={24} color={color} />
      <Text style={styles.overviewLabel}>{label}</Text>
      <Text style={[styles.overviewAmount, { color }]}>
        {amount}
      </Text>
    </View>
  );
};