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
            title: "Todas as mensagens", 
            iconName: "chat",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="cash-flow"
        options={
          { 
            title: "Fluxo de caixa", 
            iconName: "chat",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="register-product"
        options={
          { 
            title: "Registrar novo produto", 
            iconName: "chat",
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
            iconName: "chat",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="list-client"
        options={
          { 
            title: "Lista de clientes", 
            iconName: "chat",
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
            iconName: "chat",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="Programmed"
        options={
          { 
            title: "Programação", 
            iconName: "chat",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />

      <Drawer.Screen 
        name="sales-outlets"
        options={
          { 
            title: "Saida de vendas", 
            iconName: "chat",
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
            iconName: "chat",
            isDivider: true,
            notifications: 5,
          } as CustomOptions
        }
      />
    </Drawer>
  )
}