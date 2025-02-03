import { useState } from "react";
import OpenDrawer from "@/components/open-drawer";
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, SafeAreaView } from "react-native";
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
    <ImageBackground 
      source={require("../../assets/bg.jpg")}
      className="flex-1 bg-gray-900 p-4"
    >
      <SafeAreaView className="flex-1">
        {/* OpenDrawer fixado no topo */}
        <View className="absolute pt-14">
          <OpenDrawer />
        </View>

        {/* Conteúdo centralizado */}
        <View className="flex-1 justify-center gap-6">
          <Text className="text-3xl font-bold text-white bg-gray-900 p-4 rounded-lg text-center">
            Adicionar Peça
          </Text>
          
          <TextInput
            placeholder="Peça:"
            placeholderTextColor="#fff"
            value={productName}
            onChangeText={setProductName}
            className="w-full h-16 bg-gray-700 rounded-lg p-4 text-white"
          />
          <TextInput
            placeholder="Preço de Custo (R$)"
            placeholderTextColor="#fff"
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="numeric"
            className="w-full h-16 bg-gray-700 rounded-lg p-4 text-white"
          />
          <TextInput
            placeholder="Margem de Lucro (%)"
            placeholderTextColor="#fff"
            value={profitMargin}
            onChangeText={setProfitMargin}
            keyboardType="numeric"
            className="w-full h-16 bg-gray-700 rounded-lg p-4 text-white"
          />
        </View>

        {/* Botão fixo no rodapé */}
        <View className="absolute bottom-5 left-0 right-0 px-4">
          <TouchableOpacity
            className="w-full h-16 rounded-full bg-cyan-600 justify-center items-center"
            onPress={handleAddProduct}
          >
            <Text className="text-white text-2xl">Adicionar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
