import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import COLORS from '../assets/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import useGpsLogic from './Logics/useGpsLogic';

export default function GPS() {
  const {isLoading, latitude, longitude, latitudeFinal, longitudeFinal, coordinates, LATITUDE_DELTA, LONGITUDE_DELTA, handlePlaceSelected, goCompany} = useGpsLogic();

  return (
    <View style={styles.container2}>
      {isLoading === false && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#000000" style={{ marginTop: 350 }} />
        </View>
      )}
      {isLoading === true && (
        <>
          <View style={styles.container}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              showsUserLocation={true}
            >
              {latitudeFinal !== 0 && longitudeFinal !== 0 && (
                <>
                  <Marker
                    coordinate={{ latitude: latitudeFinal, longitude: longitudeFinal }}
                  />
                  <Polyline
                    coordinates={coordinates}
                    strokeWidth={5}
                    strokeColor="red"
                  />
                </>
              )}
            </MapView>
          </View>
          <View style={styles.goCompany}>
            <TouchableOpacity style={styles.customButtonTrombi} onPress={() => goCompany()}>
              <View style={styles.buttonContent}>
                <Ionicons name="bicycle" size={24} color={COLORS.neutral} />
                <Text style={styles.buttonText}>Aller à l'entreprise</Text>
              </View>
            </TouchableOpacity>
            <GooglePlacesAutocomplete
              placeholder="Où voulez-vous aller ?"
              fetchDetails
              onPress={(data, details = null) => {
                handlePlaceSelected(details);
              }}
              query={{
                key: Constants.expoConfig.extra.apikeygoogle,
                language: 'en',
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  container2: {
    flex: 1,
    backgroundColor: COLORS.mediumLight,
  },
  goCompany: {
    position: 'absolute',
    width: '90%',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    padding: 8,
    borderRadius: 8,
    marginLeft: 20,
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
});

