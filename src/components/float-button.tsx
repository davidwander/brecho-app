import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors } from "@/styles/colors";

export function FloatButton() {
  return (
    <TouchableOpacity 
      className="px-8 py-4 bg-gray-600 rounded-full absolute bottom-4 right-4"
      activeOpacity={0.7}  
    >
      <MaterialIcons name="edit" size={22} color={colors.orange[500]} />

    </TouchableOpacity>
  )
}