import { useState, useEffect } from 'react';
import axios from 'axios';
import base64 from 'base-64';
import Constants from 'expo-constants';

const PAGE_SIZE = 100;
const imageCache = new Map();

const useTrombinoscopeLogic = (token) => {
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = cardData.filter(
    data =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height) {
      setDisplayedCount(prevCount => Math.min(prevCount + PAGE_SIZE, cardData.length));
    }
  };

  const setLoadingImages = (loadingImages) => {
    if (loadingImages.length === 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }

  const getEmployeeImage = async (employeeId) => {
    if (imageCache.has(employeeId)) {
      return imageCache.get(employeeId);
    }
    setLoadingImages(prevLoading => [...prevLoading, employeeId]);
    try {
      const response = await axios.get(`https://masurao.fr/api/employees/${employeeId}/image`, {
        headers: {
          'accept': 'image/png',
          'X-Group-Authorization': Constants.expoConfig.extra.apikey,
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'arraybuffer'
      });

      const byteArray = new Uint8Array(response.data);
      let binaryString = "";
      for (let i = 0; i < byteArray.byteLength; i++) {
        binaryString += String.fromCharCode(byteArray[i]);
      }

      const base64Image = `data:image/png;base64,${base64.encode(binaryString)}`;
      imageCache.set(employeeId, base64Image);
      return base64Image;

    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error("Trop de demandes à l'API. Essayez de réduire la fréquence des demandes.");
        return null;
      } else if (error.response && error.response.status === 500) {
        console.error("Erreur serveur.");
        return null;
      } else {
        console.error("Erreur lors de la récupération de l'image:", error.message || error);
        return null;
      }
    }
  }

  const defaultData = [
    {
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      id: "1",
      imageUri: "https://images.pexels.com/photos/56618/seagull-sky-holiday-bird-56618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Jane",
      surname: "Doe",
      email: "jane.doe@example.com",
      id: "2",
      imageUri: "https://images.pexels.com/photos/56618/seagull-sky-holiday-bird-56618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Jine",
      surname: "Doe",
      email: "jine.doe@example.com",
      id: "3",
      imageUri: "https://images.pexels.com/photos/56618/seagull-sky-holiday-bird-56618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "June",
      surname: "Doe",
      email: "june.doe@example.com",
      id: "4",
      imageUri: "https://images.pexels.com/photos/56618/seagull-sky-holiday-bird-56618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Vlad",
      surname: "Zaharia",
      email: "Zaharia.vlad@gmail.com",
      id: "5",
      imageUri: "https://images.pexels.com/photos/56618/seagull-sky-holiday-bird-56618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Charles",
      surname: "Fassel",
      email: "Fassel.charles@gmail.com",
      id: "6",
      imageUri: "https://images.pexels.com/photos/56618/seagull-sky-holiday-bird-56618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    fetch('https://masurao.fr/api/employees', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Group-Authorization': Constants.expoConfig.extra.apikey,
        'Authorization': ' Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(async data => {
        const loadedData = [];

        for (const employee of data) {
          const image = await getEmployeeImage(employee.id);
          const newEmployeeData = {
            name: employee.name,
            surname: employee.surname,
            email: employee.email,
            id: employee.id,
            imageUri: image || employee.imageUri,
          };
          loadedData.push(newEmployeeData);
          setCardData([...loadedData]);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the data: ', error);
        setIsLoading(false);
        setCardData(defaultData);
        global.alert = jest.fn();
        alert('Une erreur s\'est produite lors de la connexion.');
      });
  }, []);

  return {
    filteredData,
    isLoading,
    errorMessage,
    displayedCount,
    searchQuery,
    setSearchQuery,
    handleScroll,
  };
};

export default useTrombinoscopeLogic;
