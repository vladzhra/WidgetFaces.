import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Trombinoscope from './Trombinoscope';
import Parametres from './Parametres';
import EmployeeDetails from './EmployeeDetails';
import Menu from './Menu';
import CitationDuJour from './CitationDuJour';
import TachesDuJour from './TachesDuJour';
import HorlogeMondiale from './HorlogeMondiale';
import TimeZoneSearch from './HorlogeMondiale';
import COLORS from '../assets/colors';
import { TouchableOpacity, Image } from 'react-native';
import LiensExternes from './LiensExternes';
import Anniversaires from './Anniversaires';
import News from './News';
import ReseauxSociaux from './ReseauxSociaux';
import ChatBot from './ChatBot';
import Weather from './Météo';
import Orthographe from './Orthographe';
import GPS from './Gps';
import Blague from './Blague'
import ConseilsProductivité from './ConseilsProductivité'

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.mediumLight,
      },
      headerTitleStyle: {
        fontFamily: 'custom-font',
        fontSize: 22,
        color: '#000'
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
    }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={({ navigation, route }) => {
          const token = route.params.token;
          return {
            title: 'WidgetFaces.',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Paramètres', { token })}>
                <Image
                  source={require('../assets/icons/profil.png')}
                  style={{ width: 25, height: 25, marginRight: 15 }}
                />
              </TouchableOpacity>
            )
          }
        }}
    />

      <Stack.Screen
        name="Trombinoscope"
        component={Trombinoscope}
        options={({ navigation, route }) => {
          const token = route.params.token;
          return {
            title: 'WidgetFaces.',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Paramètres', { token })}>
                <Image
                  source={require('../assets/icons/profil.png')}
                  style={{ width: 25, height: 25, marginRight: 15 }}
                />
              </TouchableOpacity>
            )
          }
        }}
      />

      <Stack.Screen name="Paramètres" component={Parametres} options={{ title: 'WidgetFaces.' }}/>
      <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} options={{ title: 'WidgetFaces.' }}/>
      <Stack.Screen name="CitationDuJour" component={CitationDuJour} options={{ title: 'Citation du jour' }}/>
      <Stack.Screen name="TachesDuJour" component={TachesDuJour} options={{ title: 'WidgetFaces.' }}/>

      <Stack.Screen name="HorlogeMondiale" component={HorlogeMondiale} options={{ title: 'WidgetFaces.' }}/>
      <Stack.Screen name="LiensExternes" component={LiensExternes} options={{ title: 'WidgetFaces.' }}/>
      <Stack.Screen name="Anniversaires" component={Anniversaires} options={{ title: 'WidgetFaces.' }}/>
      <Stack.Screen name="News" component={News} options={{ title: 'News.' }}/>
      <Stack.Screen name="ReseauxSociaux" component={ReseauxSociaux} options={{ title: 'WidgetFaces.' }}/>
      <Stack.Screen name="ChatBot" component={ChatBot} options={{ title: 'ChatBot.' }}/>
      <Stack.Screen name="Météo" component={Weather} options={{ title: 'WidgetFaces.' }}/>
      <Stack.Screen name="Orthographe" component={Orthographe} options={{ title: 'WidgetFaces.' }}/>
      <Stack.Screen name="GPS" component={GPS} options={{ title: 'WidgetFaces.' }}/>
      <Stack.Screen name="Blague" component={Blague} options={{ title: 'WidgetFaces.' }}/>
      <Stack.Screen name="ConseilsProductivité" component={ConseilsProductivité} options={{ title: 'WidgetFaces.' }}/>
    </Stack.Navigator>
  );
}

export default AppNavigator;
