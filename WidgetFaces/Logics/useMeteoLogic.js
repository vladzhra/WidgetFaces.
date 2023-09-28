import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const useMeteoLogic = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [temperature, setTemperature] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [weatherState, setWeatherState] = useState('');
  const [weatherId, setWeatherId] = useState('');
  const [weather, setWeather] = useState('');
  const [loc, setLoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');

  const setState = (data) => {
    switch (true) {
      case data.weather[0].id >= 200 && data.weather[0].id < 300:
        setWeatherState('thunderstormb');
        break;
      case data.weather[0].id >= 300 && data.weather[0].id < 400:
        setWeatherState('drizzle');
        break;
      case data.weather[0].id >= 500 && data.weather[0].id < 600:
        setWeatherState('rainy');
        break;
      case data.weather[0].id >= 600 && data.weather[0].id < 700:
        setWeatherState('snow');
        break;
      case data.weather[0].id === 800:
        setWeatherState('sunny');
        break;
      case data.weather[0].id >= 801 && data.weather[0].id < 805:
        setWeatherState('cloud');
        break;
      default:
        setWeatherState('sunny');
    }
  };
  useEffect(() => {
    const fetchWeatherData = async (ville) => {
      setIsLoading(false);
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=' +
          encodeURIComponent(ville) +
          '&appid=' +
          Constants.expoConfig.extra.apikeymeteo
        );
        const data = await response.json();
        setWeather(data);
        setTemperature((parseInt(data.main.temp)));
        setTempMin((parseInt(data.main.temp_min)));
        setTempMax((parseInt(data.main.temp_max)));
        setWeatherId((parseInt(data.weather[0].id)));
        setState(data);
        setHumidity((parseInt(data.main.humidity)));
        setWindSpeed((parseInt(data.wind.speed) * 3.6).toFixed(1));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(true);
      }
    };

    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      try {
        const location = await Location.getCurrentPositionAsync({});
        const reverseGeocode = await Location.reverseGeocodeAsync(
          location.coords
        );
        setLoc(reverseGeocode[0].city);
        setCountry(reverseGeocode[0].country);
        fetchWeatherData(reverseGeocode[0].city);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };
    getLocationAsync();
  }, []);
  const searchCity = async (ville) => {
    try {
      if (ville === '') {
        return;
      }
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        encodeURIComponent(ville) +
        '&appid=' +
        Constants.expoConfig.extra.apikeymeteo
      );
      const data = await response.json();
      setWeather(data);
      setTemperature((parseInt(data.main.temp)));
      setTempMin((parseInt(data.main.temp_min)));
      setTempMax((parseInt(data.main.temp_max)));
      const latitude = data.coord.lat;
      const longitude = data.coord.lon;
      const location = await Location.reverseGeocodeAsync({ latitude, longitude });
      setLoc(location[0].city);
      setCountry(location[0].country);
      setState(data);
      setHumidity((parseInt(data.main.humidity)));
      setWindSpeed((parseInt(data.wind.speed) * 3.6).toFixed(1));
    } catch (error) {
      alert('Ville non trouvée\nVeuillez entrer une ville valide');
      return;
    }
  };

  return {
    city, country, temperature, tempMin, tempMax, weatherState, weatherId, weather, loc, isLoading, humidity, windSpeed,
    setCity, searchCity
  };
};

export default useMeteoLogic;
