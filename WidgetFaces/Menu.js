import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../assets/colors';
import useMenuLogic from './Logics/useMenuLogic';

export default function Menu() {
  const navigation = useNavigation();
  const route = useRoute();
  const token = route.params.token;

  const {
    user, widgets, formatWidgetName, removeWidget, moveWidgetUp,
    editing, setEditing, showModal, setShowModal, deletedWidgets,
    setDeletedWidgets, editWidgetsEmpty, setWidgets
  } = useMenuLogic(token);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>
        Bienvenue {user && user.name} !
      </Text>
      <Text style={styles.slogan}>
        Nous sommes heureux de vous revoir !
      </Text>
      <ScrollView style={styles.widgetScrollView}>
      <TouchableOpacity style={styles.customButtonTrombi} onPress={() => navigation.navigate('Trombinoscope', { token })}>
        <View style={styles.buttonContent}>
          <Ionicons name="body" size={24} color={COLORS.neutral} />
          <Text style={styles.buttonText}>Trombinoscope</Text>
        </View>
      </TouchableOpacity>
      {widgets.map((widget, index) => (
        <View key={index} style={styles.widgetContainer}>
          {editing && (
            <TouchableOpacity onPress={() => moveWidgetUp(index)}>
              <Text style={styles.arrow}>↑</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate(widget.name, { token })}>
            <View style={styles.buttonContent}>
              <Ionicons name={widget.icon} size={24} color={COLORS.neutral} />
              <Text style={[styles.buttonText]}>
                {formatWidgetName(widget.name)}
              </Text>
            </View>
          </TouchableOpacity>
          {editing && (
            <TouchableOpacity style={styles.removeButton} onPress={() => removeWidget(index)}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      </ScrollView>
      <Text style={styles.padding}>
        ㅤ‎ 
      </Text>
      <Text style={styles.slogan}>
        ‎ 
      </Text>
      <TouchableOpacity style={styles.customButton3} onPress={() => setEditing(!editing)}>
        <Text style={styles.buttonText2}>{editing ? 'Terminer' : 'Editer les widgets'}</Text>
      </TouchableOpacity>
      {editing && (
        <TouchableOpacity style={styles.addButton} onPress={() => editWidgetsEmpty()}>
          <Text style={styles.buttonTextAdd}>+</Text>
        </TouchableOpacity>
      )}

      {showModal && (
        <View style={styles.modal}>
          {deletedWidgets.map((widget, index) => (
            <TouchableOpacity
              key={index}
              style={styles.customButton4}
              onPress={() => {
                setWidgets(prev => [...prev, widget]);
                setDeletedWidgets(prevDeleted => {
                  const updatedDeleted = [...prevDeleted];
                  updatedDeleted.splice(index, 1);
                  return updatedDeleted;
                });
                setShowModal(false);
              }}
            >
              <Text style={styles.buttonText}>{widget.name}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Fermer" onPress={() => setShowModal(false)} style={styles.customButton5} />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mediumLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  appName: {
    fontSize: 32,
    marginBottom: 10,
    marginTop: 65,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font'
  },
  padding: {
    fontSize: 32,
    marginBottom: 10,
    marginTop: 47,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font'
  },
  slogan: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font-quicksand'
  },
  customButtonTrombi: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '97%',
    height: 50,
    marginLeft: 10
  },
  widgetScrollView: {
    height: 300,
    width: '100%',
  },
  customButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10
  },
  customButton2: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  customButton3: {
    position: 'absolute',
    bottom: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  customButton5: {
    backgroundColor: COLORS.black,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 40,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    height: 50,
    width: '40%',
    textAlign: 'center',
    flex: null
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.neutral,
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'custom-font'
  },
  buttonTextAdd: {
    color: COLORS.neutral,
    fontSize: 18,
    fontFamily: 'custom-font'
  },
  buttonText2: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'custom-font'
  },
  removeButton: {
    backgroundColor: COLORS.danger,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40
  },
  removeButtonText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'custom-font'
  },
  widgetContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 90,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 24,
    marginRight: 10
  },
});
