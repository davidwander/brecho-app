import OpenDrawer from "@/components/open-drawer";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import { format, parseISO } from "date-fns"; // Importando parseISO para garantir que a data seja interpretada corretamente

export default function Diary() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState<{ [key: string]: string[] }>({});
  const [currentNote, setCurrentNote] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  // Função para salvar as anotações
  const handleSave = () => {
    if (!currentNote.trim()) {
      Alert.alert("Erro", "A anotação está vazia. Por favor, escreva algo.");
      return;
    }

    setNotes((prevNotes) => ({
      ...prevNotes,
      [selectedDate]: [...(prevNotes[selectedDate] || []), currentNote],
    }));

    setCurrentNote("");
    Alert.alert("Sucesso", "Anotação salva!");
  };

  // Função para deletar a anotação
  const handleDeleteNote = (index: number) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...(prevNotes[selectedDate] || [])];
      updatedNotes.splice(index, 1);

      return {
        ...prevNotes,
        [selectedDate]: updatedNotes,
      };
    });

    Alert.alert("Sucesso", "Anotação removida!");
  };

  // Função para selecionar a data no calendário
  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString); // Atualiza a data selecionada
    setShowCalendar(false);
    setCurrentNote("");
  };

  // Função para marcar as datas com anotações
  const getMarkedDates = () => {
    const marked: { [key: string]: any } = {};
    Object.keys(notes).forEach((date) => {
      marked[date] = {
        marked: true,
        dotColor: "#4C9EFF",
        ...(date === selectedDate && {
          selected: true,
          selectedColor: "#4C9EFF",
          selectedTextColor: "white",
        }),
      };
    });

    if (!marked[selectedDate]) {
      marked[selectedDate] = {
        selected: true,
        selectedColor: "#4C9EFF",
        selectedTextColor: "white",
      };
    }

    return marked;
  };

  return (
    <View className="flex-1 bg-gray-900 p-4 pt-16">
      <OpenDrawer />
      <Text className="text-white text-2xl font-bold mb-4 pt-4">Agenda</Text>

      {/* Botão para abrir o calendário */}
      <TouchableOpacity
        onPress={() => setShowCalendar(true)}
        className="bg-blue-600 p-3 rounded-lg mb-4"
      >
        <Text className="text-white font-bold">
          Selecionar Data: {format(parseISO(selectedDate), "dd/MM/yyyy")} {/* Exibindo a data no formato desejado */}
        </Text>
      </TouchableOpacity>

      {/* Modal com o Calendário Customizado */}
      <Modal visible={showCalendar} animationType="fade" transparent>
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-gray-800 p-6 rounded-lg w-11/12 shadow-lg">
            <Calendar
              markedDates={getMarkedDates()}
              onDayPress={(day: any) => handleDateSelect(day)} // Passando o objeto day para a função
              theme={{
                selectedDayBackgroundColor: "#4C9EFF",
                selectedDayTextColor: "#000",
                todayTextColor: "#a1a1aa",
                arrowColor: "#000",
                monthTextColor: "#000",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textMonthFontFamily: "Arial",
                textDayHeaderFontSize: 16,
                dotColor: "red",
                textSectionTitleColor: "#000"
              }}
              style={{
                borderRadius: 10,
                padding: 10,
                width: "100%",
              }}
            />
            <TouchableOpacity
              onPress={() => setShowCalendar(false)}
              className="bg-red-600 p-3 rounded-lg items-center mt-4"
            >
              <Text className="text-white font-bold">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lista de Anotações */}
      <Text className="text-white text-lg font-bold mb-2">
        Anotações para {format(parseISO(selectedDate), "dd 'de' MMMM 'de' yyyy")} {/* Data formatada */}
      </Text>
      <FlatList
        data={notes[selectedDate] || []}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View className="flex-row justify-between items-center bg-gray-800 p-3 rounded-lg mb-2">
            <Text className="text-white flex-1 mr-4">{item}</Text>
            <TouchableOpacity
              onPress={() => handleDeleteNote(index)}
              className="bg-red-600 p-2 rounded-lg"
            >
              <Text className="text-white font-bold">Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-400">Nenhuma anotação para esta data.</Text>
        }
      />

      {/* Campo de Anotação */}
      <TextInput
        placeholder="Escreva sua anotação aqui..."
        placeholderTextColor="#aaa"
        value={currentNote}
        onChangeText={setCurrentNote}
        multiline
        style={{ textAlignVertical: "top" }}
        numberOfLines={4}
        className="bg-gray-800 text-white p-4 rounded-lg mb-4"
      />

      {/* Botão para Salvar */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-green-600 p-4 rounded-lg items-center"
      >
        <Text className="text-white font-bold">Adicionar Anotação</Text>
      </TouchableOpacity>
    </View>
  );
}
