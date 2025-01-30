import { useState } from "react";
import OpenDrawer from "@/components/open-drawer";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, FlatList } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import "../../utils/localeCalendarConfig"; // Importação já ativa a tradução
import { Feather } from "@expo/vector-icons";
import { format, parseISO, isValid } from "date-fns";

export default function Diary() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState<{ [key: string]: string[] }>({});
  const [currentNote, setCurrentNote] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

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

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
    setCurrentNote("");
  };

  const getMarkedDates = () => {
    if (!notes || typeof notes !== "object") return {};

    const marked: { [key: string]: any } = {};

    Object.keys(notes).forEach((date) => {
      if (notes[date]?.length > 0) {
        marked[date] = {
          marked: true,
          dotColor: "#c236de",
          ...(date === selectedDate && {
            selected: true,
            selectedColor: "#c236de",
            selectedTextColor: "white",
          }),
        };
      }
    });

    if (!marked[selectedDate]) {
      marked[selectedDate] = {
        selected: true,
        selectedColor: "#c236de",
        selectedTextColor: "white",
      };
    }

    return marked;
  };

  return (
    <View className="flex-1 bg-gray-900 p-4 pt-16">
      <OpenDrawer />
      <Text className="text-white text-2xl font-bold mb-4 pt-4">Agenda</Text>

      <TouchableOpacity
        onPress={() => setShowCalendar(true)}
        className="bg-blue-600 p-3 rounded-lg mb-4"
      >
        <Text className="text-white font-bold">
          Selecionar Data: {isValid(parseISO(selectedDate)) ? format(parseISO(selectedDate), "dd/MM/yyyy") : ""}
        </Text>
      </TouchableOpacity>

      <Modal visible={showCalendar} animationType="fade" transparent>
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-gray-800 p-2 rounded-lg w-11/12 shadow-lg">
            <Calendar
              style={{ backgroundColor: "transparent" }}
              renderArrow={(direction: 'left' | 'right') => (
                <Feather size={24} color="#e8e8e8" name={`chevron-${direction}`} />
              )}
              headerStyle={{ borderBottomWidth: 0.5, borderBottomColor: "#e8e8e8", paddingBottom: 10, marginBottom: 10 }}
              theme={{
                textMonthFontSize: 18,
                monthTextColor: "#e8e8e8",
                todayTextColor: "#c236de",
                selectedDayBackgroundColor: "#c236de",
                selectedDayTextColor: "#e8e8e8",
                arrowColor: "#e8e8e8",
                calendarBackground: "transparent",
                textDayStyle: { color: "#e8e8e8" },
                textDisabledColor: "#717171",
                arrowStyle: { margin: 0, padding: 0 },
              }}
              minDate={new Date().toISOString().split("T")[0]}
              hideExtraDays
              markedDates={getMarkedDates()}
              onDayPress={handleDateSelect}
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

      <Text className="text-white text-lg font-bold mb-2">
        Anotações para {isValid(parseISO(selectedDate)) ? format(parseISO(selectedDate), "dd 'de' MMMM 'de' yyyy") : ""}
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
        ListEmptyComponent={<Text className="text-gray-400">Nenhuma anotação para esta data.</Text>}
      />

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

      <TouchableOpacity onPress={handleSave} className="bg-green-600 p-4 rounded-lg items-center">
        <Text className="text-white font-bold">Adicionar Anotação</Text>
      </TouchableOpacity>
    </View>
  );
}
