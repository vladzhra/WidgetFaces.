import React from 'react';
import { View, ScrollView, Text, StyleSheet, Button, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import COLORS from '../assets/colors';
import useParametresLogic from './Logics/useParametresLogic';

export default function ParametresComponent() {
  const route = useRoute();
  const token = route.params.token;
  const { employeeData, employeeImage } = useParametresLogic(token);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        {employeeImage && (
          <Image source={{ uri: employeeImage }} style={styles.employeeImage} />
        )}
        <Text style={styles.appName}>
          {employeeData?.name} {employeeData?.surname}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>ID:</Text>
          <Text style={styles.label}>{employeeData?.id}</Text>
        </View>
        <View style={styles.bar} />

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>E-mail:</Text>
          <Text style={styles.label}>{employeeData?.email}</Text>
        </View>
        <View style={styles.bar} />

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Date de naissance:</Text>
          <Text style={styles.label}>{employeeData?.birth_date}</Text>
        </View>
        <View style={styles.bar} />

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Genre:</Text>
          <Text style={styles.label}>{employeeData?.gender}</Text>
        </View>
        <View style={styles.bar} />

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Travail:</Text>
          <Text style={styles.label}>{employeeData?.work}</Text>
        </View>

        <Button
          title="Se déconnecter"
          onPress={() => navigation.navigate('Login')}
          color="#E57373"
          style={styles.customButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.mediumLight,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.mediumLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  appName: {
    marginTop: 10,
    fontSize: 32,
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font',
  },
  label: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginLeft: 10,
    fontFamily: 'custom-font-quicksand',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  infoText: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: COLORS.mediumLight,
    borderRadius: 5,
    borderColor: COLORS.mediumLight,
    borderWidth: 1,
    color: '#000',
    fontFamily: 'custom-font',
  },
  bar: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
    marginTop: -10,
  },
  employeeImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 50,
  },
});
