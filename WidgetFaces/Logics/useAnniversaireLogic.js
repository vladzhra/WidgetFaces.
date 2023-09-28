import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import base64 from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const useAnniversaireLogic = (token) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const [employeeImages, setEmployeeImages] = useState(null);
  const confettiRef = useRef(null);
  const [employee] = useState({ name: 'Jacob', surname: 'Bell' });

  const getEmployeeImage = async () => {
    try {
      const response = await axios.get(`https://masurao.fr/api/employees/26/image`, {
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
      return base64Image;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'image:", error.message || error);
      return null;
    }
  }

  const fetchEmployeeDetails = async (employeeId) => {
    const response = await fetch(`https://masurao.fr/api/employees/26`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Group-Authorization': Constants.expoConfig.extra.apikey,
        'Authorization': `Bearer ${token}`
      }
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error(`Received non-JSON response for employee ${employeeId}:`, text);
      throw new Error(`Server response for employee ${employeeId} was not JSON.`);
    }
    const employeeData = await response.json();
    return employeeData;
  };

  useEffect(() => {
    const fetchImages = async () => {
      const image = await getEmployeeImage();
      setEmployeeImages(image);
    }
      fetchImages();
  }, []);

  useEffect(() => {
    fetchEmployeeDetails(26)
    confettiRef.current.startConfetti();
  }, []);

  return {
    confettiRef,
    employeeImages,
    formattedDate,
    employee,
  };
};

export default useAnniversaireLogic;
