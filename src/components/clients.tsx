import { View, Text } from "react-native";
import { Avatar } from "./avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { ClientsDataProps } from "@/utils/clients";

type ClientsProps = {
  data: ClientsDataProps
}

export function Clients({ data }: ClientsProps) {
  return (
    <View className="w-full flex-row gap-4">
      <Avatar source={{ uri: data.avatar }} />

      <View className="flex-1">
        <View className="flex-row items-center gap-1">
          {data.marker && (   
            <MaterialIcons 
              name="label-important" 
              size={16} 
              color={colors.yellow[600]} 
            />
          )}

          <Text className="text-lg font-subtitle text-gray-400 flex-1">
            {data.name}
          </Text>

          <Text className="text-sm font-body text-gray-400">
            01 de Jan
          </Text>
        </View>

        <Text
          className="text-base font-body text-gray-400"
          numberOfLines={1}
          lineBreakMode="tail"
        >
          {data.subject}
        </Text>

        <View className="flex-row items-center gap-4">
          <Text
            className="text-base font-body text-gray-400 flex-1"
            numberOfLines={1}
            lineBreakMode="tail"
          >
            {data.message}

          </Text>
          <MaterialIcons
            name={data.start ? "star" : "star-outline"}
            size={22} 
            color={data.start ? colors.yellow[600] : colors.blue[600]} 
          />
        </View>
      </View>
    </View>
  )
}