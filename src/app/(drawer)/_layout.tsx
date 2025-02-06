import { Drawer } from "expo-router/drawer"

import { DrawerContent } from "@/components/drawer-content"
import { CustomOptions } from "@/types/navigation"

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "65%"
        }
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="(tabs)"
        options={
          { 
            title: "Todas as mensagens", 
            iconName: "chat",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="addProduct"
        options={
          { 
            title: "Adicionar peça", 
            iconName: "playlist-add-check-circle",
            isDivider: false,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="inventory"
        options={
          { 
            title: "Estoque", 
            iconName: "storefront",
            isDivider: false,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="dashboard"
        options={
          { 
            title: "Dashboard", 
            iconName: "moving",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="register-client"
        options={
          { 
            title: "Cadastrar novo cliente", 
            iconName: "person-add",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="list-clients"
        options={
          { 
            title: "Lista de clientes", 
            iconName: "list-alt",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="diary"
        options={
          { 
            title: "Agenda", 
            iconName: "edit-square",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="programmed"
        options={
          { 
            title: "Programação", 
            iconName: "edit-note",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="config"
        options={
          { 
            title: "configuração", 
            iconName: "tune",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />
    </Drawer>
  )
}