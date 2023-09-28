import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import COLORS from '../assets/colors';

const { width } = Dimensions.get('window');

export default function Card({ imageUri, name, email, surname, onCardPress }) {
    return (
      <TouchableOpacity onPress={onCardPress}>
        <View style={styles.card}>
          <Image
            style={styles.cardImage}
            source={{
              uri: imageUri,
            }}
          />
          <Text style={styles.cardTextName}>{name + ' ' + surname}</Text>
          <Text style={styles.cardText}>{email}</Text>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: width / 2 - 10,
    width: width / 2 - 30,
    borderRadius: 10,
    backgroundColor: COLORS.mediumLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    margin: 10,
    overflow: 'hidden',
  },
  cardImage: {
    maxWidth: width / 2 - 10,
    width: width / 2 - 30,
    height: width / 2 - 30,
    borderRadius: 30,
  },
  cardTextName: {
    padding: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardText: {
    padding: 1,
    textAlign: 'center',
  },
});
