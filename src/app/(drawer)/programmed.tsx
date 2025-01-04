import OpenDrawer from "@/components/open-drawer";
import { View, Text } from "react-native";

export default function Programmed() {
  return (
    <View className="flex-1 bg-gray-900 items-center justify-center">
    <OpenDrawer />
      <Text className="text-white text-2xl font font-heading">
        Programação
      </Text>
    </View>
  )
}