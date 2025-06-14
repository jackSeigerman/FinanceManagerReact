import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categories } from '../constants/categories';

interface CategorySelectorProps {
  theme: any;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  theme,
  selectedCategory,
  onCategoryChange,
}) => {
  const styles = StyleSheet.create({
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
      borderColor: theme.border,
      backgroundColor: theme.inputBackground,
      minWidth: '48%',
    },
    categoryButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    categoryButtonText: {
      fontSize: 14,
      color: theme.textSecondary,
      marginLeft: 8,
    },
    categoryButtonTextActive: {
      color: 'white',
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.categoryContainer}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.key}
          style={[
            styles.categoryButton,
            selectedCategory === category.key && styles.categoryButtonActive
          ]}
          onPress={() => onCategoryChange(category.key)}
        >
          <Ionicons 
            name={category.icon as any} 
            size={20} 
            color={selectedCategory === category.key ? 'white' : theme.textSecondary} 
          />
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === category.key && styles.categoryButtonTextActive
          ]}>
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};