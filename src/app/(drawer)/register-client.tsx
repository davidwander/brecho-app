import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import OpenDrawer from "@/components/open-drawer";

export default function RegisterClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    // Aqui você pode implementar a lógica para salvar os dados
    console.log({ name, phone, email });
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      className="flex-1 bg-gray-900 px-4 py-6 pt-16"
    >
      <OpenDrawer />
      <Text 
        className="bg-gray-800 justify-center items-center p-6 mt-4 mb-4 rounded-lg text-white text-2xl font-heading"
      >
        Cadastrar Cliente
      </Text>

      <View className="space-y-4">
        <TextInput
          className="bg-gray-800 text-white px-4 py-3 rounded-lg mb-4"
          placeholder="Nome do Cliente"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="bg-gray-800 text-white px-4 py-3 rounded-lg mb-4"
          placeholder="Telefone"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          className="bg-gray-800 text-white px-4 py-3 rounded-lg"
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          className="bg-blue-600 py-3 rounded-lg items-center mt-4"
          onPress={handleRegister}
        >
          <Text className="text-white text-lg font-semibold">Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
