import OpenDrawer from "@/components/open-drawer";
import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";

export default function CashFlow() {
  const [transactions, setTransactions] = useState([
    { id: "1", type: "Entrada", amount: 500, description: "Venda de produto" },
    { id: "2", type: "Saída", amount: 200, description: "Compra de material" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: "Entrada",
    amount: "",
    description: "",
  });

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === "Entrada"
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);
  };

  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const transaction = {
      ...newTransaction,
      id: (transactions.length + 1).toString(),
      amount: parseFloat(newTransaction.amount),
    };

    setTransactions([...transactions, transaction]);
    setModalVisible(false);
    setNewTransaction({ type: "Entrada", amount: "", description: "" });
  };

  return (
    <View className="flex-1 bg-gray-900 p-4 pt-16">
      <OpenDrawer />
      <Text className="text-white text-2xl font font-heading mb-4 pt-4">Fluxo de caixa</Text>

      {/* Saldo Atual */}
      <View className="bg-gray-800 p-4 rounded-lg mb-4">
        <Text className="text-white text-lg font-semibold">Saldo Atual</Text>
        <Text className="text-green-400 text-2xl font-bold">
          R$ {calculateBalance().toFixed(2)}
        </Text>
      </View>

      {/* Lista de Transações */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className={`flex-row justify-between items-center p-3 mb-2 rounded-lg ${
              item.type === "Entrada" ? "bg-green-800" : "bg-red-800"
            }`}
          >
            <Text className="text-white">{item.description}</Text>
            <Text className="text-white font-bold">
              {item.type === "Entrada" ? "+" : "-"} R$ {item.amount.toFixed(2)}
            </Text>
          </View>
        )}
        className="mb-4"
      />

      {/* Botão para Adicionar Transação */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-blue-600 p-3 rounded-lg items-center"
      >
        <Text className="text-white font-bold text-lg">Adicionar Transação</Text>
      </TouchableOpacity>

      {/* Modal Simulado */}
      {modalVisible && (
        <View className="absolute inset-0 flex-1 justify-center items-center">
          {/* Fundo Translúcido */}
          <View className="absolute inset-0 bg-black opacity-80" />

          {/* Conteúdo do Modal */}
          <View className="bg-gray-900 p-4 rounded-lg w-11/12">
            <Text className="text-white text-xl font-bold mb-4">Nova Transação</Text>

            <TextInput
              placeholder="Descrição"
              placeholderTextColor="#aaa"
              value={newTransaction.description}
              onChangeText={(text) =>
                setNewTransaction({ ...newTransaction, description: text })
              }
              className="bg-gray-800 text-white p-3 rounded-lg mb-3"
            />

            <TextInput
              placeholder="Valor (R$)"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={newTransaction.amount}
              onChangeText={(text) =>
                setNewTransaction({ ...newTransaction, amount: text })
              }
              className="bg-gray-800 text-white p-3 rounded-lg mb-3"
            />

            <TouchableOpacity
              onPress={() =>
                setNewTransaction({
                  ...newTransaction,
                  type: newTransaction.type === "Entrada" ? "Saída" : "Entrada",
                })
              }
              className="bg-blue-600 p-3 rounded-lg items-center mb-3"
            >
              <Text className="text-white font-bold">
                Tipo: {newTransaction.type}
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={addTransaction}
                className="bg-green-600 p-3 rounded-lg items-center flex-1 mr-2"
              >
                <Text className="text-white font-bold">Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-red-600 p-3 rounded-lg items-center flex-1 ml-2"
              >
                <Text className="text-white font-bold">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
