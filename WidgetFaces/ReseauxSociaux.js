import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Linking, TouchableOpacity, ActivityIndicator } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../assets/colors';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';


const nom_de_lentreprise = Constants.expoConfig.extra.entreprise;

export default function SocialMediaWidget() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...FontAwesome.font,
      });
      setFontLoaded(true);
    }
  
    loadFonts();
  }, []);

  // const [tweets, setTweets] = useState([]);

  // useEffect(() => {
  //   const fetchTweets = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/latest-tweets');
  //       const data = await response.json();
  //       setTweets(data);
  //     } catch (error) {
  //       console.error("Error fetching tweets from our API:", error);
  //     }
  //   };
  //   fetchTweets();
  // }, []);

  if (!fontLoaded) {
    return <View style={styles.container}><ActivityIndicator /></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Réseaux sociaux</Text>
      <Text style={styles.slogan}>Retrouvez nous ici !</Text>

      <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/' + nom_de_lentreprise + '.technology')}>
        <FontAwesome name="facebook-square" size={40} color="#3b5998" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL('https://www.twitter.com/' + nom_de_lentreprise)}>
        <FontAwesome name="twitter-square" size={40} color="#1DA1F2" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/' + nom_de_lentreprise + '.national')}>
        <FontAwesome name="instagram" size={40} color="#C13584" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/' + nom_de_lentreprise)}>
        <FontAwesome name="linkedin-square" size={40} color="#0077B5" />
      </TouchableOpacity>

      {/* <View style={{marginTop: 20}}>
        {tweets.map(tweet => (
          <Text key={tweet.id}> {tweet.text} </Text>
        ))}
      </View> */}
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
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font'
  },
  slogan: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font-quicksand'
  },
});