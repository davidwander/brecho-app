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
      className="bg-gray-600 p-3 rounded-lg"
    >
      <MaterialIcons  name="chevron-left" size={22} color={"white"} />
    </TouchableOpacity>
  )
}