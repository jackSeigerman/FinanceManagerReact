import React, { createContext, useContext, useState, ReactNode } from 'react';

export const colors = {
  light: {
    primary: '#007AFF',
    background: '#F2F2F7',
    cardBackground: '#FFFFFF',
    inputBackground: '#F2F2F7',
    text: '#000000',
    textSecondary: '#666666',
    textTertiary: '#999999',
    border: '#E5E5EA',
    overlay: 'rgba(0, 0, 0, 0.5)',
    incomeColor: '#34C759',
    expenseColor: '#FF3B30',
  },
  dark: {
    primary: '#0A84FF',
    background: '#000000',
    cardBackground: '#1C1C1E',
    inputBackground: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: '#AEAEB2',
    textTertiary: '#636366',
    border: '#38383A',
    overlay: 'rgba(0, 0, 0, 0.7)',
    incomeColor: '#30D158',
    expenseColor: '#FF453A',
  },
};

interface ThemeContextType {
  theme: typeof colors.light;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const theme = isDarkMode ? colors.dark : colors.light;
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};