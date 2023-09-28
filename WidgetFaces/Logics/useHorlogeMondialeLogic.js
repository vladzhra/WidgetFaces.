import { useState, useEffect, Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useHorlogeMondialeLogic = () => {
  const [selectedTimezones, setSelectedTimezones] = useState(['Europe/Paris']);
  const [isTimeZoneSearchVisible, setTimeZoneSearchVisible] = useState(false);
  const [currentPhoneTime, setCurrentPhoneTime] = useState(new Date());
  const [removeButtonsVisible, setRemoveButtonsVisible] = useState(false);
  const [showRemoveButtons, setShowRemoveButtons] = useState(false);

  const handleAddTimezone = () => {
    setTimeZoneSearchVisible(true);
  };

  const handleTimeZoneSelect = async (timezone) => {
    if (!selectedTimezones.includes(timezone)) {
      const updatedTimezones = [...selectedTimezones, timezone];
      setSelectedTimezones(updatedTimezones);

      try {
        await AsyncStorage.setItem('selectedTimezones', JSON.stringify(updatedTimezones));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des timezones sélectionnées :', error);
      }
    }
    setTimeZoneSearchVisible(false);
  };

  const toggleRemoveButtons = () => {
    setRemoveButtonsVisible(!removeButtonsVisible);
  };

  const handleRemoveTimezone = async (timezone) => {
    const updatedTimezones = selectedTimezones.filter((tz) => tz !== timezone);
    setSelectedTimezones(updatedTimezones);

    try {
      await AsyncStorage.setItem('selectedTimezones', JSON.stringify(updatedTimezones));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des timezones sélectionnées :', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTimezones = await AsyncStorage.getItem('selectedTimezones');
        if (storedTimezones) {
          setSelectedTimezones(JSON.parse(storedTimezones));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des timezones sélectionnées :', error);
      }
    };
  
    fetchData();

    const interval = setInterval(() => {
      setCurrentPhoneTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

    return { selectedTimezones, setTimeZoneSearchVisible, currentPhoneTime, setShowRemoveButtons, isTimeZoneSearchVisible, handleTimeZoneSelect, handleRemoveTimezone };
};

export default useHorlogeMondialeLogic;