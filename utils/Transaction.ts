import { Double } from "react-native/Libraries/Types/CodegenTypes";

export type Transaction = {
  id: number;
  description: string;
  amount: Double;
  type: string;
  category: string;
  date: string;
};

export type Category = {
  key: string;
  label: string;
  icon: string;
};