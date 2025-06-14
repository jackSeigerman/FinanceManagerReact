import { categories } from '../constants/categories';

export const getCategoryIcon = (category: string): string => {
  const cat = categories.find(c => c.key === category);
  return cat ? cat.icon : 'ellipsis-horizontal';
};

export const getCategoryLabel = (category: string): string => {
  const cat = categories.find(c => c.key === category);
  return cat ? cat.label : 'Other';
};