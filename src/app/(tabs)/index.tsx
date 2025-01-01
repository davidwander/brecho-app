import { View, Text } from "react-native"

import { Input } from "@/components/input"
import { MenuButton } from "@/components/menu-button"
import { Avatar } from "@/components/avatar"

export default function Home() {
  return (
    <View className="flex-1 bg-gray-900 pt-16 p-4">
      <Input>
        <MenuButton />
        <Input.Field placeholder="Pesquisar clientes" />
        <Avatar 
          source={{ uri: "https://github.com/davidwander.png" }} 
          size="medium"
        />
      </Input>
    </View>
  )
}