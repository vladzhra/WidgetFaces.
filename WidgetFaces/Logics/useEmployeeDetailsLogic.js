import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';

const useEmployeeDetailsLogic = () => {
  const route = useRoute();
  const employeeId = route.params.id;
  const token = route.params.token;
  const image = route.params.image;
  const [cardData, setCardData] = useState(null);
  const [leaderData, setLeaderData] = useState(null);

  useEffect(() => {
    fetch(`https://masurao.fr/api/employees/${employeeId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Group-Authorization': Constants.expoConfig.extra.apikey,
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const employee = {
          id: data.id,
          email: data.email,
          name: data.name,
          surname: data.surname,
          birth_date: data.birth_date,
          gender: data.gender,
          work: data.work,
          subordinates: data.subordinates,
        };
        setCardData(employee);
      })
      .catch(error => {
        console.error('There was an error fetching the data: ', error);
      });
  }, [employeeId, token]);

  useEffect(() => {
    fetch(`https://masurao.fr/api/employees/leaders`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Group-Authorization': Constants.expoConfig.extra.apikey,
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setLeaderData(data[0]);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the leader data: ', error);
      });
  }, [token]);

  return {
    cardData,
    image,
    leaderData,
    employeeId
  };
};

export default useEmployeeDetailsLogic;
