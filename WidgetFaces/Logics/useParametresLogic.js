import { useState, useEffect } from 'react';
import axios from 'axios';
import base64 from 'base-64';
import Constants from 'expo-constants';

const useParametresLogic = (token) => {
  const [employeeData, setEmployeeData] = useState(null);
  const [employeeImage, setEmployeeImage] = useState(null);

  useEffect(() => {
    fetch('https://masurao.fr/api/employees/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Group-Authorization': Constants.expoConfig.extra.apikey,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Server responded with status:', response.status);
        return null;
      }
    })
    .then(data => {
      if (data && data.id) {
        setEmployeeData(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    if (employeeData) {
      fetchEmployeeImage();
    }
  }, [employeeData]);

  const getEmployeeImage = async (employeeId) => {
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
      return base64Image;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'image:", error.message || error);
      return null;
    }
  }

  const fetchEmployeeImage = async () => {
    if (employeeData && employeeData.id) {
      const image = await getEmployeeImage(employeeData.id);
      setEmployeeImage(image);
    }
  }

  return { employeeData, employeeImage };
};

export default useParametresLogic;
