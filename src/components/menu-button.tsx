import { Pressable } from "react-native"
import { colors } from "@/styles/colors"
import { useNavigation } from "expo-router"
import { DrawerActions } from "@react-navigation/native"
import { ChartNoAxesGantt } from "lucide-react-native"

export function MenuButton() {
  const navigation = useNavigation()
  const toggleMenu = () => navigation.dispatch(DrawerActions.toggleDrawer())

  return (
    <Pressable onPress={toggleMenu}>
      <ChartNoAxesGantt size={35} color={colors.white} />
    </Pressable>
  )
}