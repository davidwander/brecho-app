import { View, FlatList, Text } from "react-native"

import { CLIENTS } from "@/utils/clients"

import { Clients } from "@/components/clients"
import { Input } from "@/components/input"
import { Avatar } from "@/components/avatar"
import { MenuButton } from "@/components/menu-button"

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

      

      <FlatList 
        data={CLIENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Clients data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-6"
        ListHeaderComponent={() => (
          <Text className="uppercase text-gray-400 text-sm font-subtitle mt-6">
            Entrada
          </Text>
        )}
      />
    </View>


  )
}