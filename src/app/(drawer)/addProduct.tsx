import { useState } from "react";
import OpenDrawer from "@/components/open-drawer";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useProduct } from "@/context/ProductContext";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(""); // Preço de custo
  const [profitMargin, setProfitMargin] = useState(""); // Margem de lucro
  const { addProduct } = useProduct();

  function handleAddProduct() {
    if (!productName.trim() || !productPrice.trim() || !profitMargin.trim()) {
      return Alert.alert("Todos os campos devem ser preenchidos");
    }

    const price = parseFloat(productPrice);
    const margin = parseFloat(profitMargin);

    if (isNaN(price) || isNaN(margin)) {
      return Alert.alert("Insira valores numéricos válidos para preço e margem de lucro");
    }

    addProduct({ name: productName, price, profitMargin: margin });
    Alert.alert(`Peça "${productName}" adicionada com sucesso!`);
    setProductName("");
    setProductPrice("");
    setProfitMargin("");
  }

  return (
    <View className="bg-gray-900 flex-1 justify-center p-4 pt-2 gap-4">
      <OpenDrawer />
      <Text 
        className="text-3xl font-bold text-white"
      >
        Adicionar Peça
      </Text>
      <TextInput
        placeholder="Peça:"
        value={productName}
        onChangeText={setProductName}
        className="w-full h-16 bg-gray-700 rounded-lg p-4 text-white"
      />
      <TextInput
        placeholder="Preço de Custo (R$)"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
        className="w-full h-16 bg-gray-700 rounded-lg p-4 text-white"
      />
      <TextInput
        placeholder="Margem de Lucro (%)"
        value={profitMargin}
        onChangeText={setProfitMargin}
        keyboardType="numeric"
        className="w-full h-16 bg-gray-700 rounded-lg p-4 text-white"
      />
      <TouchableOpacity
        className="w-full h-16 rounded-full bg-cyan-600 justify-center items-center"
        onPress={handleAddProduct}
      >
        <Text className="text-white text-2xl">Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
