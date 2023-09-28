import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import COLORS from '../assets/colors';
import Confetti from 'react-native-confetti';
import useAnniversaireLogic from './Logics/useAnniversaireLogic';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function AnniversaireComponent() {
  const route = useRoute();
  const token = route.params.token;

  const {
    confettiRef,
    employeeImages,
    formattedDate,
    employee,
  } = useAnniversaireLogic(token);

  return (
    <View style={styles.container}>
      <Confetti ref={confettiRef} />
      <Text style={styles.appName}>Joyeux Anniversaire !</Text>
      {/* <Text style={styles.slogan}>Joyeux anniversaire aux membres suivants</Text> */}
      <Ionicons name="ice-cream-outline" size={90} color={COLORS.black} style={styles.icon} />
      <View key={employee.id} style={styles.birthdayContainer}>
        {employeeImages &&
          <Image source={{ uri: employeeImages }} style={styles.employeeImage} />
        }
        <Text style={styles.text}>
          Joyeux anniversaire {employee.name} {employee.surname}!
        </Text>
      </View>
      <Text style={styles.currentDateText}>Aujourd'hui: {formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mediumLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  employeeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  birthdayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: COLORS.black,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  appName: {
    fontSize: 32,
    marginBottom: 40,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font'
  },
  slogan: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font-quicksand'
  },
  text: {
    fontSize: 20,
    color: COLORS.primary,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 20,
    marginBottom: 30,
    color: COLORS.primary,
  },
  currentDateText: {
    fontSize: 22,
    color: COLORS.primary,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  noBirthdayText: {
    fontSize: 18,
    color: COLORS.black,
    fontStyle: 'italic',
  }
});