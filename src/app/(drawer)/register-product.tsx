import OpenDrawer from "@/components/open-drawer";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";

export default function RegisterProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [profitPercentage, setProfitPercentage] = useState("");
  const [sellingPrice, setSellingPrice] = useState<number | null>(null);

  const handleRegister = () => {
    if (!product.name || !product.price || !product.quantity) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    Alert.alert("Sucesso", "Produto registrado com sucesso!");
    setModalVisible(true); // Abre o modal após registrar o produto
  };

  const calculateProfit = () => {
    if (!profitPercentage) {
      Alert.alert("Erro", "Por favor, insira a porcentagem de lucro.");
      return;
    }

    const price = parseFloat(product.price);
    const percentage = parseFloat(profitPercentage);

    const profit = (price * percentage) / 100;
    setSellingPrice(price + profit);
  };

  return (
    <View className="flex-1 bg-gray-900 p-4 pt-16">
      <OpenDrawer />
      <Text className="text-white text-2xl font font-heading mb-4 pt-4">
        Registrar Produtos
      </Text>

      {/* Formulário de Cadastro */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="mb-4">
          <Text className="text-white mb-2">Nome do Produto *</Text>
          <TextInput
            placeholder="Digite o nome do produto"
            placeholderTextColor="#aaa"
            value={product.name}
            onChangeText={(text) => setProduct({ ...product, name: text })}
            className="bg-gray-800 text-white p-3 rounded-lg"
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">Preço (R$) *</Text>
          <TextInput
            placeholder="Digite o preço"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={product.price}
            onChangeText={(text) => setProduct({ ...product, price: text })}
            className="bg-gray-800 text-white p-3 rounded-lg"
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">Quantidade *</Text>
          <TextInput
            placeholder="Digite a quantidade"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={product.quantity}
            onChangeText={(text) => setProduct({ ...product, quantity: text })}
            className="bg-gray-800 text-white p-3 rounded-lg"
          />
        </View>

        <View className="mb-6">
          <Text className="text-white mb-2">Descrição (opcional)</Text>
          <TextInput
            placeholder="Digite uma descrição"
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
            value={product.description}
            onChangeText={(text) => setProduct({ ...product, description: text })}
            className="bg-gray-800 text-white p-3 rounded-lg"
          />
        </View>

        {/* Botão de Registrar */}
        <TouchableOpacity
          onPress={handleRegister}
          className="bg-blue-600 p-4 rounded-lg items-center"
        >
          <Text className="text-white font-bold text-lg">Registrar Produto</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para Calcular Lucro */}
      {modalVisible && (
        <View className="absolute inset-0 flex-1 justify-center items-center">
          {/* Fundo Translúcido */}
          <View className="absolute inset-0 bg-black opacity-80" />

          {/* Conteúdo do Modal */}
          <View className="bg-gray-900 p-4 rounded-lg w-11/12">
            <Text className="text-white text-xl font-bold mb-4">Calcular Lucro</Text>

            <Text className="text-white mb-2">Preço do Produto: R$ {product.price}</Text>

            <TextInput
              placeholder="Digite a porcentagem de lucro (%)"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={profitPercentage}
              onChangeText={(text) => setProfitPercentage(text)}
              className="bg-gray-800 text-white p-3 rounded-lg mb-4"
            />

            {sellingPrice !== null && (
              <Text className="text-green-400 text-lg font-bold mb-4">
                Preço de Venda: R$ {sellingPrice.toFixed(2)}
              </Text>
            )}

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={calculateProfit}
                className="bg-blue-600 p-3 rounded-lg items-center flex-1 mr-2"
              >
                <Text className="text-white font-bold">Calcular</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-red-600 p-3 rounded-lg items-center flex-1 ml-2"
              >
                <Text className="text-white font-bold">Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
