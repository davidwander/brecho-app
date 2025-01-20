import { View, Text, Dimensions, ScrollView, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';

import { PieChart, LineChart } from "react-native-chart-kit";
import { useProduct } from "@/context/ProductContext";
import OpenDrawer from "@/components/open-drawer";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Ícones para melhorar o visual
import { useState } from "react";

export default function Dashboard() {
  const { products } = useProduct();
  const [selectedPeriod, setSelectedPeriod] = useState("Mensal");

  // Calculando os valores de custo (saídas) e venda (entradas)
  const totalCost = products.reduce((acc, product) => acc + product.price, 0); // Soma de todos os preços de custo
  const totalSales = products
    .filter((product) => product.sold) // Filtrando apenas os vendidos
    .reduce((acc, product) => acc + product.sellingPrice, 0); // Soma dos preços de venda dos produtos vendidos

  const totalSold = products.filter((product) => product.sold).length; // Total de produtos vendidos
  const totalInStock = products.filter((product) => !product.sold).length; // Total de produtos em estoque
  const totalProfit = totalSales - totalCost; // Lucro estimado

  // Dados para o gráfico de pizza
  const pieChartData = [
    {
      name: "Saídas",
      value: totalCost,
      color: "#FF6384", // Cor para saídas
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "Entradas",
      value: totalSales,
      color: "#36A2EB", // Cor para entradas
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
  ];

  // Dados simulados para o gráfico em linha
  const lineChartData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        data: [1200, 1500, 800, 1700, 2000, 1800], // Dados de vendas
        color: () => "#36A2EB", // Cor para vendas
      },
      {
        data: [1000, 1100, 700, 1400, 1600, 1500], // Dados de custos
        color: () => "#FF6384", // Cor para custos
      },
    ],
    legend: ["Vendas", "Custos"], // Legendas do gráfico
  };

  // Exibe notificações simuladas
  const showNotification = () =>
    Alert.alert("Notificação", "Os lucros mensais ultrapassaram a meta!");

  return (
    <View className="flex-1 bg-gray-900 p-4 pt-16">
      {/* O OpenDrawer fica fora da ScrollView */}
      <OpenDrawer />
      <Text className="text-white text-2xl mb-4 pt-4">Dashboard</Text>

      {/* Notificações */}
      <View className="bg-cyan-600 p-4 rounded-lg mb-4 flex-row items-center">
        <MaterialIcons name="notifications" size={24} color="#FFFFFF" />
        <Text className="text-white ml-2">
          Você ultrapassou sua meta de vendas este mês!
        </Text>
      </View>

      {/* ScrollView para o restante do conteúdo */}
      <ScrollView className="flex-1 p-4">
        {/* Filtros por período */}
        <View className="bg-gray-800 p-4 rounded-lg mb-4">
          <Text className="text-white text-lg mb-2">Filtrar por Período:</Text>
          <Picker
            selectedValue={selectedPeriod}
            onValueChange={(value) => setSelectedPeriod(value)}
            style={{ color: "#FFFFFF", backgroundColor: "#4A5568", borderRadius: 10 }}
          >
            <Picker.Item label="Diário" value="Diário" />
            <Picker.Item label="Semanal" value="Semanal" />
            <Picker.Item label="Mensal" value="Mensal" />
          </Picker>
        </View>

        {/* Métricas importantes */}
        <View className="bg-gray-800 p-4 rounded-lg mb-4">
          <Text className="text-white text-lg mb-2">Métricas:</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <FontAwesome name="dollar" size={24} color="#36A2EB" />
              <Text className="text-white mt-2">Entradas:</Text>
              <Text className="text-white font-bold">R$ {totalSales.toFixed(2)}</Text>
            </View>
            <View className="items-center">
              <FontAwesome name="shopping-cart" size={24} color="#FF6384" />
              <Text className="text-white mt-2">Saídas:</Text>
              <Text className="text-white font-bold">R$ {totalCost.toFixed(2)}</Text>
            </View>
            <View className="items-center">
              <FontAwesome name="line-chart" size={24} color="#00C851" />
              <Text className="text-white mt-2">Lucro:</Text>
              <Text className="text-white font-bold">R$ {totalProfit.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Gráfico em pizza */}
        <PieChart
          data={pieChartData}
          width={Dimensions.get("window").width - 32}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: () => "#FFFFFF",
          }}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[0, 0]}
        />

        {/* Gráfico em linha */}
        <Text className="text-white text-lg mt-4 mb-2">Performance Mensal:</Text>
        <LineChart
          data={lineChartData}
          width={Dimensions.get("window").width - 32}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: () => "#FFFFFF",
          }}
          bezier
          style={{ borderRadius: 8 }}
        />
      </ScrollView>
    </View>
  );
}
