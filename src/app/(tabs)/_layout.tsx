import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

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
        tabBarActiveTintColor: colors.orange[500],
        tabBarInactiveTintColor: colors.gray[500],
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home-filled" size={size} color={color}/>
          )
        }}
      />
      <Tabs.Screen 
        name="chat" 
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="chat" size={size} color={color}/>
          )
        }}
      />
      <Tabs.Screen 
        name="meeting" 
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="meeting-room" size={size} color={color}/>
          )
        }}
      />
    </Tabs>
  )
}