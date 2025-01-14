import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { useCashFlow } from '@/context/cashFlowContext';
import OpenDrawer from '@/components/open-drawer';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { format } from 'date-fns'; // Importa a função format do date-fns

export default function Dashboard() {
  const { transactions, calculateBalance } = useCashFlow();
  const screenWidth = Dimensions.get('window').width;

  // Função para formatar a data
  const formatTransactionDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy'); // Formata a data como "dd/MM/yyyy"
  };

  // Função para verificar se há transações
  const hasTransactions = transactions.length > 0;

  // Agrupar transações por data
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.date;

    if (!acc[date]) {
      acc[date] = { date: formatTransactionDate(date), transactions: [] }; // Formata a data aqui
    }

    acc[date].transactions.push(transaction);
    return acc;
  }, {} as { [key: string]: { date: string; transactions: typeof transactions } });

  // Dados do gráfico de linha
  const lineChartData = {
    labels: hasTransactions
    ? transactions.map((transaction) => {
        const date = new Date(transaction.date); // Ajuste conforme o formato da data no seu sistema
        return `${date.getHours()}:${date.getMinutes()}`; // Retorna hora:minuto
      })
    : ['Nenhum dado'],
    datasets: [
      {
        data: hasTransactions
          ? transactions.map((transaction) =>
              transaction.type === 'Entrada'
                ? transaction.amount || 0
                : -(transaction.amount || 0)
            )
          : [0],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Dados do gráfico de pizza
  const pieChartData = hasTransactions
    ? transactions.reduce(
        (acc, transaction) => {
          if (transaction.type === 'Entrada') {
            acc[0].value += transaction.amount;
          } else {
            acc[1].value += transaction.amount;
          }
          return acc;
        },
        [
          { name: 'Entradas', value: 0, color: '#00FF00', legendFontColor: '#fff', legendFontSize: 14 },
          { name: 'Saídas', value: 0, color: '#FF0000', legendFontColor: '#fff', legendFontSize: 14 },
        ]
      )
    : [
        { name: 'Nenhum dado', value: 1, color: '#CCCCCC', legendFontColor: '#fff', legendFontSize: 14 },
      ];

  // Dados para a FlatList
  const flatListData = [
    {
      id: '1',
      type: 'graph',
      title: 'Evolução do Saldo',
      component: (
        <LineChart
          data={lineChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#000',
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        />
      ),
    },
    {
      id: '2',
      type: 'graph',
      title: 'Distribuição de Entradas e Saídas',
      component: (
        <PieChart
          data={pieChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ),
    },
    {
      id: '3',
      type: 'transaction',
      title: 'Lista de Transações',
      component: (
        <FlatList
          data={Object.values(groupedTransactions)} // Exibe transações agrupadas por data
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View className="mb-4">
              <Text className="text-white text-xl font-semibold mb-2">{item.date}</Text> {/* Exibe a data formatada */}
              <FlatList
                data={item.transactions}
                keyExtractor={(transaction) => transaction.id.toString()} // Certifique-se de usar um id único para cada transação
                renderItem={({ item }) => (
                  <View
                    className={`flex-row justify-between items-center p-3 mb-2 rounded-lg ${
                      item.type === 'Entrada' ? 'bg-green-800' : 'bg-red-800'
                    }`}
                  >
                    <Text className="text-white">{item.description}</Text>
                    <Text className="text-white font-bold">
                      {item.type === 'Entrada' ? '+' : '-'} R$ {item.amount.toFixed(2)}
                    </Text>
                  </View>
                )}
                className="mb-4"
              />
            </View>
          )}
        />
      ),
    },
  ];

  return (
    <View className="flex-1 bg-gray-900 p-4 pt-16">
      <OpenDrawer />
      <Text className="text-white text-2xl font-bold mb-4 pt-4">Dashboard</Text>

      {/* Saldo Atual */}
      <View className="bg-gray-800 p-4 rounded-lg mb-6">
        <Text className="text-white text-lg font-semibold">Saldo Atual</Text>
        <Text className="text-green-400 text-2xl font-bold">
          R$ {calculateBalance().toFixed(2)}
        </Text>
      </View>

      {/* FlatList para gráficos e transações */}
      <FlatList
        data={flatListData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-6">
            <Text className="text-white text-xl font-semibold mb-2">{item.title}</Text>
            {item.component}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
