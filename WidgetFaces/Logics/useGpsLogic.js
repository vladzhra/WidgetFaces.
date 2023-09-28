import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import axios from 'axios';
import { Dimensions } from 'react-native';

const useGpsLogic = () => {
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [longitudeFinal, setLongitudeFinal] = useState(0);
  const [latitudeFinal, setLatitudeFinal] = useState(0);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(false);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      try {
        const location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      } catch (error) {
        console.error('Error getting location:', error);
      } finally {
        setIsLoading(true);
      }
    };
    getLocation();
  }, []);

  const handlePlaceSelected = (details) => {
    setLatitudeFinal(details.geometry.location.lat);
    setLongitudeFinal(details.geometry.location.lng);
  };

  async function fetchDirections(originLat, originLng, destLat, destLng, apiKey) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&key=${apiKey}`
      );

      if (response.data.status === 'OK') {
        const route = response.data.routes[0];
        const overviewPolyline = route.overview_polyline;
        const points = overviewPolyline.points;
        const decodedCoordinates = decode(points);
        return decodedCoordinates;
      } else {
        console.error('Aucun itinéraire trouvé.');
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des directions:', error);
      return null;
    }
  }

  function decode(encoded) {
    const poly = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      const latitude = lat / 1e5;
      const longitude = lng / 1e5;

      poly.push({ latitude, longitude });
    }

    return poly;
  }

  const goCompany = () => {
    setLatitudeFinal(48.815557);
    setLongitudeFinal(2.3629495);
  };

  useEffect(() => {
    if (latitudeFinal !== 0 && longitudeFinal !== 0) {
      fetchDirections(latitude, longitude, latitudeFinal, longitudeFinal, Constants.expoConfig.extra.apikeygoogle)
        .then(decodedCoordinates => {
          if (decodedCoordinates) {
            setCoordinates(decodedCoordinates);
          }
        });
    }
  }, [latitudeFinal, longitudeFinal]);

  return {
    isLoading, latitude, longitude, latitudeFinal, longitudeFinal, coordinates, LATITUDE_DELTA, LONGITUDE_DELTA, handlePlaceSelected, goCompany
  };
};

export default useGpsLogic;
