import React from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text, TextInput } from 'react-native';
import Card from './Card';
import { useRoute, useNavigation } from '@react-navigation/native';
import COLORS from '../assets/colors';
import useTrombinoscopeLogic from './Logics/useTrombinoscopeLogic';

export default function TrombinoscopeComponent() {
  const route = useRoute();
  const token = route.params.token;
  const navigation = useNavigation();

  const {
    filteredData,
    isLoading,
    errorMessage,
    displayedCount,
    searchQuery,
    setSearchQuery,
    handleScroll
  } = useTrombinoscopeLogic(token);


  if (errorMessage) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.background} onScroll={handleScroll} scrollEventThrottle={400}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un contact..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <View style={styles.container}>
        {Array.from({ length: Math.ceil(displayedCount / 2) }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {filteredData.slice(rowIndex * 2, rowIndex * 2 + 2).map((data, index) => (
              <Card
                key={index}
                imageUri={data.imageUri}
                name={data.name}
                surname={data.surname}
                email={data.email}
                id={data.id}
                onCardPress={() => navigation.navigate('EmployeeDetails', { id: data.id, token: token, image: data.imageUri })}
              />
              ))}
            </View>
            ))}
          </View>
        </ScrollView>
        {isLoading && (
        <View style={styles.bottomLoaderContainer}>
          <ActivityIndicator size="small" color="black" />
        </View>
      )}
    </>
  );

}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.mediumLight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.mediumLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  errorMessage: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center'
  },
  bottomLoaderContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  searchInput: {
    width: '95%',
    padding: 10,
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: COLORS.neutral,
    borderRadius: 5,
    borderColor: '#BDA18A',
    borderWidth: 1,
    color: '#000',
    fontFamily: 'custom-font'
  },
});