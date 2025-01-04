import { Drawer } from "expo-router/drawer"

import { DrawerContent } from "@/components/drawer-content"
import { CustomOptions } from "@/types/navigation"

export default function DrawerLayout() {
  return (
    <Drawer
      defaultStatus="open"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "75%"
        }
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="(tabs)"
        options={
          { 
            title: "Todas as caixas de entrada", 
            iconName: "all-inbox",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />
    </Drawer>
  )
}