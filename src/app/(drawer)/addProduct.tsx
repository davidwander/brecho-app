import { useState } from "react";
import OpenDrawer from "@/components/open-drawer";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { api } from "@/server/api";
import { isAxiosError } from "axios";
import { useProduct } from "@/context/ProductContext";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const { addProduct } = useProduct();

  async function handleAddProduct() {
    if (!productName.trim()) {
      return Alert.alert("Todos os campos devem ser preenchidos");
    }

    try {
      const response = await api.post("/user", { name: productName });
      addProduct(response.data); // Atualiza o contexto
      Alert.alert(`Peça "${response.data.name}" adicionado com sucesso!`);
      setProductName("");
    } catch (error) {
      if (isAxiosError(error)) {
        return Alert.alert(error.response?.data || "Ocorreu um erro!");
      }

      Alert.alert("Não é possível adicionar produto!");
    }
  }

  return (
    <View className="bg-gray-900 flex-1 justify-center p-4 gap-2">
      <OpenDrawer />
      <TextInput
        placeholder="Adicione a peça aqui..."
        value={productName}
        onChangeText={setProductName}
        className="w-full h-16 bg-gray-700 rounded-lg p-4 text-white"
      />
      <TouchableOpacity
        className="w-full h-16 rounded-full bg-cyan-600 justify-center items-center"
        onPress={handleAddProduct}
      >
        <Text 
        className="text-white text-2xl"
        >
          Adicionar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
