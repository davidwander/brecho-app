import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useCashFlow } from '@/context/cashFlowContext';
import OpenDrawer from '@/components/open-drawer';

export default function CashFlow() {
  const { transactions, addTransaction, removeTransaction, calculateBalance } = useCashFlow();
  const [newTransaction, setNewTransaction] = useState({
    type: 'Entrada' as 'Entrada' | 'Saída',
    amount: '',
    description: '',
  });

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date); // Exibe como dd/mm/yyyy
  };

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const transaction = {
      ...newTransaction,
      id: (transactions.length + 1).toString(),
      amount: parseFloat(newTransaction.amount),
      date: new Date().toISOString(), // Data no formato ISO
    };

    addTransaction(transaction);
    setNewTransaction({ type: 'Entrada', amount: '', description: '' });
  };

  // Agrupar transações por data
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.date;

    if (!acc[date]) {
      acc[date] = { date, transactions: [] };
    }

    acc[date].transactions.push(transaction);
    return acc;
  }, {} as { [key: string]: { date: string; transactions: typeof transactions } });

  const handleRemoveTransaction = (transactionId: string) => {
    removeTransaction(transactionId);
  };

  return (
    <View className="flex-1 bg-gray-900 p-4 pt-16">
      <OpenDrawer />
      <Text className="text-white text-2xl font-bold mb-4 pt-4">Fluxo de Caixa</Text>

      {/* Saldo Atual */}
      <View className="bg-gray-800 p-4 rounded-lg mb-4">
        <Text className="text-white text-lg font-semibold">Saldo Atual</Text>
        <Text className="text-green-400 text-2xl font-bold">
          R$ {calculateBalance().toFixed(2)}
        </Text>
      </View>

      {/* Adicionar Transação */}
      <TextInput
        placeholder="Descrição"
        value={newTransaction.description}
        onChangeText={(text) => setNewTransaction({ ...newTransaction, description: text })}
        className="bg-gray-800 text-white p-3 rounded-lg mb-3"
      />
      <TextInput
        placeholder="Valor (R$)"
        keyboardType="numeric"
        value={newTransaction.amount}
        onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: text })}
        className="bg-gray-800 text-white p-3 rounded-lg mb-3"
      />

      {/* Escolher tipo de transação (Entrada ou Saída) */}
      <View className="mb-3">
        <Text className="text-white">Tipo de Transação</Text>
        <Picker
          selectedValue={newTransaction.type}
          onValueChange={(itemValue: any) => setNewTransaction({ ...newTransaction, type: itemValue })}
          style={{ height: 50, width: 150, color: "#fff" }}
        >
          <Picker.Item label="Entrada" value="Entrada" />
          <Picker.Item label="Saída" value="Saída" />
        </Picker>
      </View>

      {/* Lista de Transações agrupadas por data */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Object.values(groupedTransactions)}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Text className="text-white text-xl font-semibold mb-2">
              {formatDate(item.date)} {/* Data formatada */}
            </Text>
            <FlatList
              data={item.transactions}
              keyExtractor={(transaction) => transaction.id}
              renderItem={({ item }) => (
                <View
                  className={`flex-row justify-between items-center p-3 mb-2 rounded-lg ${
                    item.type === 'Entrada' ? 'bg-green-800' : 'bg-red-800'
                  }`}
                >
                  <Text className="text-white">{item.description}</Text>
                  <Text className="text-white font-bold">
                    {item.type === 'Entrada' ? '+' : '-'} R$ {item.amount.toFixed(2)}
                  </Text>
                  <TouchableOpacity onPress={() => handleRemoveTransaction(item.id)}>
                    <Text className="text-red-500">Remover</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      />
      <TouchableOpacity 
        className='w-full h-14 bg-cyan-600 rounded-xl justify-center mb-2'
        onPress={handleAddTransaction}
      >
        <Text className='text-slate-300 text-center text-xl'>
          Adicionar Transação
        </Text>
      </TouchableOpacity>
    </View>
  );
}
