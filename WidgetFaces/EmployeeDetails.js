import React from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Linking, TouchableOpacity, Text, Image } from 'react-native';
import COLORS from '../assets/colors';
import useEmployeeDetailsLogic from './Logics/useEmployeeDetailsLogic';
import { Ionicons } from '@expo/vector-icons';

export default function EmployeeDetailsComponent() {
  const { cardData, image, leaderData } = useEmployeeDetailsLogic();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.cardImage}
          source={{ uri: image }}
        />
        {cardData ? (
          <View style={styles.card}>
            <Text style={styles.headerText}>{cardData.name} {cardData.surname}</Text>
            <View style={styles.row}>
              <Ionicons name="person-circle-outline" size={20} style={styles.iconStyle} />
              <Text>ID n°{cardData.id || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="mail-outline" size={20} style={styles.iconStyle} />
              {cardData.email ? (
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${cardData.email}`)}>
                  <Text style={styles.linkText}>{cardData.email}</Text>
                </TouchableOpacity>
              ) : (
                <Text>Email: N/A</Text>
              )}
            </View>
            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={20} style={styles.iconStyle} />
              <Text>Birth date: {cardData.birth_date || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="transgender" size={20} style={styles.iconStyle} />
              <Text>Gender: {cardData.gender || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="pencil" size={20} style={styles.iconStyle} />
              <Text>Work: {cardData.work || 'N/A'}</Text>
            </View>
            {cardData.subordinates && cardData.subordinates.length > 0 ? (
              <>
                <Text style={styles.subordinatesHeader}>Subordinates:</Text>
                {cardData.subordinates.map((subordinate, index) => (
                  <View key={index} style={styles.subordinateRow}>
                    <Ionicons name="person-outline" size={20} style={styles.iconStyle} />
                    <Text>{subordinate.name || 'N/A'}</Text>
                  </View>
                ))}
              </>
            ) : (
              <Text>No subordinates listed.</Text>
            )}
          </View>
        ) : (
          <ActivityIndicator size="large" color="#C49D83" />
        )}
        {leaderData && cardData && cardData.id !== leaderData.id && (
          <View style={[styles.card, styles.leaderCard]}>
            <Text style={styles.headerText}>Leader: {leaderData.name} {leaderData.surname}</Text>
            <View style={styles.row}>
              <Ionicons name="mail-outline" size={20} style={styles.iconStyle} />
              <Text>Email: {leaderData.email}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.mediumLight,
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 15,
  },
  card: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconStyle: {
    marginRight: 6,
  },
  cardImage: {
    marginVertical: 10,
    padding: '50%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.95,
    shadowRadius: 3.84,
  },
  cardText: {
    padding: 1,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  leaderCard: {
    marginTop: 10,
  },
});
