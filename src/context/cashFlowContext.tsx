// context/cashFlowContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Transaction {
  date: any;
  id: string;
  type: 'Entrada' | 'Saída'; // Tipagem restrita
  amount: number;
  description: string;
}

interface CashFlowContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  calculateBalance: () => number;
  removeTransaction: (transactionId: string) => void;
}

interface CashFlowProviderProps {
  children: React.ReactNode; // Tipagem de children
}

const CashFlowContext = createContext<CashFlowContextType | undefined>(undefined);

export const CashFlowProvider: React.FC<CashFlowProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'Entrada'
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  const removeTransaction = (transactionId: string) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== transactionId)
    );
  };

  return (
    <CashFlowContext.Provider value={{ transactions, addTransaction, removeTransaction, calculateBalance }}>
      {children}
    </CashFlowContext.Provider>
  );
};

export const useCashFlow = (): CashFlowContextType => {
  const context = useContext(CashFlowContext);
  if (!context) {
    throw new Error('useCashFlow must be used within a CashFlowProvider');
  }
  return context;
};
