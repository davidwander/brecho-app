import { View, Text } from "react-native";
import { Avatar } from "./avatar";
import { colors } from "@/styles/colors";
import { ClientsDataProps } from "@/utils/clients";
import { MessageSquareText } from "lucide-react-native";

type ClientsProps = {
  data: ClientsDataProps
}

export function Clients({ data }: ClientsProps) {
  return (
    <View className="w-full flex-row gap-4">
      <Avatar source={{ uri: data.avatar }} />

      <View className="flex-1">
        <View className="flex-row items-center gap-1">
            <MessageSquareText
              size={22} 
              color={colors.yellow[600]} 
            />

          <Text className="text-lg font-subtitle text-gray-400 flex-1">
            {data.name}
          </Text>

          <Text className="text-sm font-body text-gray-400">
            01 de Jan
          </Text>
        </View>

        <View className="flex-row items-center gap-4">
          <Text
            className="text-base font-body text-gray-400 flex-1"
            numberOfLines={1}
            lineBreakMode="tail"
          >
            {data.message}

          </Text>
        </View>
      </View>
    </View>
  )
}