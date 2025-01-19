import { View, Text, FlatList } from "react-native";
import { useProduct } from "@/context/ProductContext";
import OpenDrawer from "@/components/open-drawer";

export default function Inventory() {
  const { products } = useProduct();

  return (
    <View className="bg-gray-900 flex-1 justify-center p-4 gap-2 pt-16">
      <OpenDrawer />
      <Text className="text-2xl text-white pt-4">Estoque</Text>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-gray-800 mb-2 p-4 rounded-lg">
            <Text className="text-white text-sm">{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-xl text-white">Nenhuma peça disponível.</Text>
        }
      />
    </View>
  );
}
