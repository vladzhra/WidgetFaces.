import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';

const useLiensExternesLogic = () => {
  const [tasksList, setTasksList] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [sender, setSender] = useState('');
  const [user, setUser] = useState({});
  const route = useRoute();
  const token = route.params.token;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tachesDuJour');
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          setTasksList(parsedTasks);
        }
      } catch (error) {
        console.error("Failed to fetch tasks from storage:", error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const storeTasks = async () => {
      try {
        await AsyncStorage.setItem('tachesDuJour', JSON.stringify(tasksList));
      } catch (error) {
        console.error("Failed to store tasks:", error);
      }
    };

    storeTasks();
  }, [tasksList]);

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

  const handleAddTask = () => {
    if (title.trim() && isValidURL(url.trim())) {
      const newTask = {
        title: title.trim(),
        url: url.trim(),
        sender: `${user.name} ${user.surname}`,
        timestamp: Date.now(),
      };
      setTasksList([...tasksList, newTask]);
      setTitle('');
      setUrl('');
      setSender('');
    } else {
      alert('Entrez un Titre, un URL et un Nom valides');
    }
  };

  const handleOpenLink = (url) => {
    if (isValidURL(url)) {
      Linking.openURL(url);
    } else {
      alert('Lien invalide');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasksList = [...tasksList];
    newTasksList.splice(index, 1);
    setTasksList(newTasksList);
  };

  const isValidURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(str);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return {
    tasksList, title, url, sender, modalVisible,
    setTitle, setUrl, setModalVisible, handleAddTask, formatDate, handleOpenLink, handleDeleteTask
  };
};

export default useLiensExternesLogic;
