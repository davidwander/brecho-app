import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "lucide-react-native";
import { Pressable, PressableProps, View, Text } from "react-native";
import clsx from "clsx";

export type IconNameProps = keyof typeof MaterialIcons.glyphMap

type DrawerButtonProps = PressableProps & {
  title: string
  isFocused?: boolean
  isDivider?: boolean
  iconName: IconNameProps
  notifications?: number[]
}

export function DrawerButton({ title, isFocused, isDivider, iconName, notifications, ...rest }: DrawerButtonProps) {

  return (
    <Pressable className={clsx("py-2 w-full " , {
      "border-b border-gray-500": isDivider,
     })}
     {...rest}
    >
      <View
        className={clsx("flex-row items-center gap-4 h-14 px-6 -ml-2 w-full", {
          "-ml-14": isDivider,
          "bg-purple-500 rounded-r-full": isFocused,
        })}
      >
        <MaterialIcons 
          name={iconName} 
          size={28} 
          color={isFocused ? colors.violet[200] : colors.purple[300]} 
        />
        <Text 
          className={clsx("text-white font-subtitle text-base", {
            "text-orange-300": isFocused,
          })}>
            {title}
        </Text>

        <Text 
          className={clsx("text-gray-400 text-sm font-body", {
            "text-orange-300": isFocused,
          })}
        >
          {notifications}
        </Text>
      </View>
    </Pressable>
  )
}