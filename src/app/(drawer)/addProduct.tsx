import { useState } from "react";
import OpenDrawer from "@/components/open-drawer";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert
} from "react-native";

import { api } from "@/server/api";
import { isAxiosError  } from "axios";


export default function addProduct() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSignIn() {
    try {
      const response = await api.post("/user", {
        email,
        password,
      })

      Alert.alert(`Olá ` + response.data.name)
    } catch (error) {
      if(isAxiosError(error)){
        return Alert.alert(error.response?.data)
      }

      Alert.alert("Não foi possível entrar")
    }
  }

  return (
    <View className="bg-gray-900 flex-1 justify-center p-4 gap-2">
      <OpenDrawer />
      <TextInput
        placeholder="E-mail"
        onChangeText={setEmail}
        className="w-full h-16 bg-gray-700 rounded-lg"
      />
      <TextInput 
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        className="w-full h-16 bg-gray-700 rounded-lg"
      />
      <TouchableOpacity
        className="w-full h-16 rounded-full bg-cyan-600 justify-center items-center mt-64"
        onPress={handleSignIn}
      >
        <Text className="text-white text-2xl">
          Add Product
        </Text>
      </TouchableOpacity>
    </View>
  )
}