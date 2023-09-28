import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useMenuLogic = (token) => {
  const [deletedWidgets, setDeletedWidgets] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const [widgets, setWidgets] = useState([
    { name: 'Météo', enabled: true, icon: 'ios-partly-sunny' },
    { name: 'News', enabled: true, icon: 'newspaper' },
    { name: 'LiensExternes', enabled: true, icon: 'link' },
    { name: 'ConseilsProductivité', enabled: true, icon: 'bulb' },
    { name: 'TachesDuJour', enabled: true, icon: 'checkmark-done' },
    { name: 'Orthographe', enabled: true, icon: 'school' },
    { name: 'Anniversaires', enabled: true, icon: 'calendar' },
    { name: 'ChatBot', enabled: true, icon: 'chatbox-ellipses' },
    { name: 'ReseauxSociaux', enabled: true, icon: 'share-social' },
    { name: 'CitationDuJour', enabled: false, icon: 'book' },
    { name: 'GPS', enabled: true, icon: 'compass' },
    { name: 'Blague', enabled: true, icon: 'happy-sharp' },
    { name: 'HorlogeMondiale', enabled: true, icon: 'time-outline' },
  ]);

  function formatWidgetName(name) {
    return name.replace(/([A-Z])/g, ' $1').trim();
  }

  const saveWidgetsToStorage = async () => {
    try {
      await AsyncStorage.setItem('widgets', JSON.stringify(widgets));
      await AsyncStorage.setItem('deletedWidgets', JSON.stringify(deletedWidgets));
    } catch (error) {
      console.error("Failed to save widget data to storage:", error);
    }
  };

  const loadWidgetsFromStorage = async () => {
    try {
      const storedWidgets = await AsyncStorage.getItem('widgets');
      const storedDeletedWidgets = await AsyncStorage.getItem('deletedWidgets');

      if (storedWidgets !== null) setWidgets(JSON.parse(storedWidgets));
      if (storedDeletedWidgets !== null) setDeletedWidgets(JSON.parse(storedDeletedWidgets));
    } catch (error) {
      console.error("Failed to load widget data from storage:", error);
    }
  };

  const removeWidget = (index) => {
    setDeletedWidgets(prevDeleted => [...prevDeleted, widgets[index]]);
    setWidgets(prevWidgets => {
      const newWidgets = [...prevWidgets];
      newWidgets.splice(index, 1);
      return newWidgets;
    });
  };

  const moveWidgetUp = (index) => {
    if (index > 0) {
      const newWidgets = [...widgets];
      const widgetToMove = newWidgets[index];
      newWidgets.splice(index, 1);
      newWidgets.splice(index - 1, 0, widgetToMove);
      setWidgets(newWidgets);
    }
  };

  const editWidgetsEmpty = () => {
    if (deletedWidgets.length === 0) {
      Alert.alert(
        "Pas de widgets disponibles",
        "Vous avez déjà tous les widgets disponibles",
        [
          { text: "OK" }
        ]
      );
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    fetch('https://masurao.fr/api/employees/me', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'X-Group-Authorization': Constants.expoConfig.extra.apikey,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setUser(data);
    })
    .catch(error => {
      console.error("Il y a eu un problème avec la requête fetch:", error);
    });
  }, [token]);

  useEffect(() => {
    for (let i = 0; i < widgets.length; i++) {
      if (widgets[i].enabled == false) {
        removeWidget(i);
      }
    }
  }, []);

  useEffect(() => {
    loadWidgetsFromStorage();
  }, []);

  useEffect(() => {
    saveWidgetsToStorage();
  }, [widgets, deletedWidgets]);

  return {
    user, widgets, formatWidgetName, removeWidget, moveWidgetUp,
    editing, setEditing, showModal, setShowModal, deletedWidgets,
    setDeletedWidgets, editWidgetsEmpty, setWidgets
  };
};

export default useMenuLogic;