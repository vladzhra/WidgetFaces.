import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import COLORS from '../assets/colors';
import useNewsLogic from './Logics/useNewsLogic';

export default function NewsComponent() {
  const { newsData, isLoading, openURL } = useNewsLogic();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          style={styles.newsList}
          data={newsData}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.newsItem}>
              <TouchableOpacity onPress={() => openURL(item.url)}>
                <Text style={styles.newsTitle}>{item.title}</Text>
              </TouchableOpacity>
              <Text style={styles.newsDescription}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mediumLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'custom-font',
    fontSize: 22,
    color: COLORS.primary,
    marginBottom: 20
  },
  newsItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsDescription: {
    fontSize: 16,
  },
  newsList: {
    paddingTop: 20,
  }
});