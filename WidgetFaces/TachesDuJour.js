import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import COLORS from '../assets/colors';
import useTachesDuJourLogic from './Logics/useTachesDuJourLogic';

export default function TachesDuJourComponent() {
  const {
    task,
    setTask,
    tasksList,
    handleAddTask,
    handleDeleteTask
  } = useTachesDuJourLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tâches du jour</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={task}
          onChangeText={setTask}
          style={styles.input}
          placeholder="Ajoutez une tâche..."
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasksList}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity onPress={() => handleDeleteTask(index)}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mediumLight,
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
    fontFamily: 'custom-font',
  },
  deleteButtonText: {
    fontSize: 20,
    marginLeft: 10,
  },
});
