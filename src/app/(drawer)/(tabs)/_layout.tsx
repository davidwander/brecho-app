import { colors } from "@/styles/colors";
import { Tabs } from "expo-router";
import { ChartScatter, House, MessageSquareText } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          minHeight: 74,
        },
        tabBarItemStyle: {
          paddingBottom: 34,
          paddingTop: 14
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.purple[300],
        tabBarInactiveTintColor: colors.purple[300],
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <House size={32} color={color}/>
          )
        }}
      />
      <Tabs.Screen 
        name="chat" 
        options={{
          tabBarIcon: ({ color }) => (
            <MessageSquareText size={32} color={color}/>
          )
        }}
      />
      <Tabs.Screen 
        name="meeting" 
        options={{
          tabBarIcon: ({ color }) => (
            <ChartScatter size={32} color={color}/>
          )
        }}
      />
    </Tabs>
  )
}