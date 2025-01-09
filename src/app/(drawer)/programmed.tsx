import OpenDrawer from "@/components/open-drawer";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";

interface Program {
  id: string;
  title: string;
  description: string;
  completed: boolean; // Novo estado para verificar se a tarefa está concluída
}

export default function Programmed() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Função para adicionar uma nova programação
  const handleAddProgram = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Erro", "Título e descrição são obrigatórios.");
      return;
    }

    const newProgram: Program = {
      id: Date.now().toString(),
      title,
      description,
      completed: false, // Inicialmente, a tarefa não está concluída
    };

    setPrograms((prev) => [...prev, newProgram]);
    setTitle("");
    setDescription("");
    Alert.alert("Sucesso", "Programação adicionada!");
  };

  // Função para remover uma programação
  const handleDeleteProgram = (id: string) => {
    setPrograms((prev) => prev.filter((program) => program.id !== id));
    Alert.alert("Sucesso", "Programação removida!");
  };

  // Função para alternar o estado de conclusão da programação
  const toggleCompletion = (id: string) => {
    setPrograms((prev) =>
      prev.map((program) =>
        program.id === id ? { ...program, completed: !program.completed } : program
      )
    );
  };

  // Função para renderizar cada item da lista
  const renderProgram = ({ item }: { item: Program }) => (
    <View
      className={`bg-gray-800 p-4 rounded-lg mb-2 ${
        item.completed ? "opacity-60" : ""
      }`}
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className={`text-lg font-bold ${item.completed ? "text-gray-400 line-through" : "text-white"}`}>
          {item.title}
        </Text>
        <Checkbox
          value={item.completed}
          onValueChange={() => toggleCompletion(item.id)}
          color={item.completed ? "#4C9EFF" : undefined}
        />
      </View>
      <Text className={`text-gray-400 ${item.completed ? "line-through" : ""}`}>
        {item.description}
      </Text>
      <TouchableOpacity
        onPress={() => handleDeleteProgram(item.id)}
        className="bg-red-600 p-2 rounded-lg mt-2"
      >
        <Text className="text-white font-bold text-center">Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-900 p-4 pt-16">
      <OpenDrawer />
      <Text className="text-white text-2xl font-bold mb-4 pt-4">Programações</Text>

      {/* Formulário de Adição */}
      <View className="bg-gray-800 p-4 rounded-lg mb-4">
        <TextInput
          placeholder="Título"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={setTitle}
          className="bg-gray-900 text-white p-3 rounded-lg mb-2"
        />
        <TextInput
          placeholder="Descrição"
          placeholderTextColor="#aaa"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={{ textAlignVertical: "top" }}
          className="bg-gray-900 text-white p-3 rounded-lg mb-2"
        />
        <TouchableOpacity
          onPress={handleAddProgram}
          className="bg-green-600 p-3 rounded-lg items-center"
        >
          <Text className="text-white font-bold">Adicionar Programação</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Programações */}
      <FlatList
        data={programs}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderProgram}
        ListEmptyComponent={
          <Text className="text-gray-400 text-center">
            Nenhuma programação adicionada.
          </Text>
        }
      />
    </View>
  );
}
