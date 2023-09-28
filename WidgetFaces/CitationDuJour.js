import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import COLORS from '../assets/colors';
import useCitationDuJourLogic from './Logics/useCitationDuJourLogic';

export default function CitationDuJourComponent() {
  const { quote, author } = useCitationDuJourLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.quoteText}>"{quote}"</Text>
      <Text style={styles.authorText}>- {author}</Text>
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
  appName: {
    fontSize: 32,
    marginBottom: 40,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font'
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font'
  },
});
