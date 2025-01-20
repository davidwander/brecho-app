// inventory.tsx
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useProduct } from "@/context/ProductContext";
import OpenDrawer from "@/components/open-drawer";
import { FontAwesome } from "@expo/vector-icons"; // Para ícones

export default function Inventory() {
  const { products, toggleProductSold } = useProduct();

  return (
    <View className="bg-gray-900 flex-1 justify-center p-4 gap-2 pt-16">
      <OpenDrawer />
      <Text className="text-2xl text-white pt-4">Estoque</Text>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-gray-800 mb-2 p-4 rounded-lg flex-row items-center justify-between">
            <View>
              <Text className="text-white text-sm">Peça: {item.name}</Text>
              <Text className="text-white text-sm">Preço de Custo: R$ {item.price.toFixed(2)}</Text>
              <Text className="text-white text-sm">Preço de Venda: R$ {item.sellingPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleProductSold(item.id)}
              style={{
                backgroundColor: item.sold ? "#32CD32" : "#FF6347", // Verde se vendido, vermelho se não
                padding: 8,
                borderRadius: 10,
              }}
            >
              <FontAwesome
                name={item.sold ? "check-circle" : "circle-o"} // Ícone de checado ou não
                size={22}
                color="white"
              />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-xl text-white">Nenhuma peça disponível.</Text>
        }
      />
    </View>
  );
}
