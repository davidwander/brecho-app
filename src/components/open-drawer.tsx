import { MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function OpenDrawer() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handlerPress = () => {
    navigation.openDrawer();
  }

  return (
    <TouchableOpacity 
      onPress={handlerPress}
      className="bg-gray-600 p-2 rounded-2xl w-12"
    >
      <MaterialIcons  name="chevron-left" size={28} color={"white"} />
    </TouchableOpacity>
  )
}