import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Função para buscar tarefas no Firestore
  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar as tarefas');
      console.error(error);
    }
  };

  // Função para adicionar uma nova tarefa
  const addTask = async () => {
    if (task.trim() === '') {
      Alert.alert('Erro', 'O campo de tarefa não pode estar vazio!');
      return;
    }

    try {
      await addDoc(collection(db, 'tasks'), { name: task });
      setTask('');
      fetchTasks();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a tarefa');
      console.error(error);
    }
  };

  // Função para deletar uma tarefa
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      fetchTasks();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar a tarefa');
      console.error(error);
    }
  };

  // Buscar tarefas ao carregar o app
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Adicionar nova tarefa"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Adicionar Tarefa" onPress={addTask} color="#007BFF" />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Text style={styles.taskItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
  },
});
