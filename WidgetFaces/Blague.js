import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import COLORS from '../assets/colors';
import useBlagueLogic from './Logics/useBlagueLogic';

export default function BlagueComponent() {
  const { quote, answer } = useBlagueLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.authorText}>{quote}</Text>
      <Text style={styles.quoteText}>{answer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mediumLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  quoteText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font-quicksand',
    fontStyle: 'italic'
  },
  authorText: {
    fontSize: 20,
    fontFamily: 'custom-font',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
});

