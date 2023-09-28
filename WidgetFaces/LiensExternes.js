import React, { useEffect } from 'react';
import { Modal, Button, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import COLORS from '../assets/colors';
import * as Font from 'expo-font';
import useLiensExternesLogic from './Logics/useLiensExternesLogic';

export default function LiensExternesComponent() {
  const { tasksList, title, url, sender, modalVisible, setTitle, setUrl, setModalVisible, handleAddTask, formatDate, handleOpenLink, handleDeleteTask } = useLiensExternesLogic();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'custom-font': require('../assets/fonts/LeagueSpartan-Bold.otf'),
        'custom-font-quicksand': require('../assets/fonts/Quicksand_Light.otf')
      });
    }
    loadFont();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liens Externes</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalView}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Titre"
            placeholderTextColor='#BDA18A'
          />
          <TextInput
            value={url}
            onChangeText={setUrl}
            style={styles.input}
            placeholder="URL"
            placeholderTextColor='#BDA18A'
          />
          <TouchableOpacity onPress={() => { handleAddTask(); setModalVisible(false); }} style={styles.addButton}>
            <Text style={styles.addButtonText}>Ajouter</Text>
          </TouchableOpacity>
          <Button title="Annuler" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <FlatList
        data={tasksList}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titleText}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleOpenLink(item.url)}>
                <Text style={styles.linkText}>{item.url}</Text>
              </TouchableOpacity>
              <Text style={styles.senderText}>Envoyé par: {item.sender}</Text>
              <Text style={styles.senderText}>Posté le: {formatDate(item.timestamp)}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteTask(index)} style={styles.deleteButton}>
              <Text style={styles.deleteIconText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Ajouter un lien</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mediumLight,
    padding: 20,
    justifyContent: 'space-between',
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
    width: '95%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: COLORS.neutral,
    borderRadius: 5,
    borderColor: '#BDA18A',
    borderWidth: 1,
    color: '#000',
    fontFamily: 'custom-font'
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignSelf: 'center',
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'custom-font',
  },
  deleteIconText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  modalView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton4: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 40,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    height: 50,
    width: '80%',
    flex: null
  },
  taskText: {
    fontSize: 18,
    fontFamily: 'custom-font',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 12,
  },
  linkText: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  deleteButton: {
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  senderText: {
    fontSize: 14,
    marginTop: 1,
    fontStyle: 'italic',
  },
});