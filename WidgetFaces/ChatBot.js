import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import COLORS from '../assets/colors';
import useChatBotLogic from './Logics/useChatBotLogic';

export default function ChatBotComponent() {
  const {
    userMessage,
    setUserMessage,
    chatbotResponse,
    handleChatGPT,
    isLoading
  } = useChatBotLogic();

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <Text style={styles.appName}>ChatBot.</Text>
        <Text style={styles.slogan}>Posez vos questions à l'IA !</Text>
        <TextInput
          style={styles.input}
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder="Tapez votre texte ici..."
        />
        <TouchableOpacity style={styles.button} onPress={handleChatGPT}>
          <Text style={styles.customFont}>Demander</Text>
        </TouchableOpacity>
        {
          isLoading && <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
        }
        { chatbotResponse != '' && (
          <>
            <Text style={styles.title}>Voici notre réponse :</Text>
            <Text style={styles.responseText}>{chatbotResponse}</Text>
          </>
        )}
      </ScrollView>
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
  input: {
    width: '95%',
    padding: 10,
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: COLORS.neutral,
    borderRadius: 5,
    borderColor: '#BDA18A',
    borderWidth: 1,
    color: '#000',
    fontFamily: 'custom-font'
  },
  appName: {
    fontSize: 25,
    marginBottom: 100,
    marginTop: 200,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font',
    marginBottom: 150
  },
  slogan: {
    fontSize: 18,
    marginTop: -130,
    marginBottom: 100,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font-quicksand'
  },
  title: {
    fontFamily: 'custom-font',
    color: COLORS.black,
    alignSelf: 'center',
    fontSize: 22,
    marginBottom: 10,
    marginTop: 30
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
  responseText: {
    fontSize: 18,
    color: COLORS.black,
    alignSelf: 'center',
    fontFamily: 'custom-font',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 10,
    textAlign: 'center',
    width: '80%',
    backgroundColor: COLORS.mediumLight,
  },
  customFont: {
    fontFamily: 'custom-font',
    color: COLORS.neutral,
  },
  button: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
});
