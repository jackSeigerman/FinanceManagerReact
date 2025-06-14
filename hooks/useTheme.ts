import { colors } from '../constants/colors';

export const useTheme = (isDarkMode: boolean) => {
  return isDarkMode ? colors.dark : colors.light;
};