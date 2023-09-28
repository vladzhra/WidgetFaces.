import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import COLORS from '../assets/colors';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import useMeteoLogic from './Logics/useMeteoLogic';

export default function Météo() {
  const { city, country, temperature, tempMin, tempMax, weatherState, loc, isLoading, humidity, windSpeed, setCity, searchCity } = useMeteoLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Météo</Text>
      <View style={{ paddingHorizontal: 20, marginTop: 100 }}>
        {isLoading === false && (
          <ActivityIndicator size="large" color="#000000" style={{ marginTop: 100 }} />
        )}
        {isLoading === true && (
          <View style={styles.fond}>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              justifyContent: 'space-between', borderRadius: 20, borderWidth: 5,
              borderColor: COLORS.primary, marginTop: -60, paddingHorizontal: 10
            }}>
              <TextInput value={city} onChangeText={(text) => setCity(text)}
                placeholder='Rechercher une ville' placeholderTextColor={COLORS.black}
                style={{ paddingHorizontal: 10, color: COLORS.black, fontFamily: 'custom-font'}} />
              <TouchableOpacity onPress={() => { searchCity(city) }}>
                <Ionicons name='search' size={22} color={COLORS.black}/>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40 }}>
              <Ionicons name='location' size={22} color={COLORS.black} />
              <Text style={{ fontSize: 22, color: COLORS.black, marginLeft: 5, fontFamily: 'custom-font' }}>{loc}</Text>
            </View>
            <Text style={{ fontSize: 18, color: COLORS.black, marginLeft: 28, fontFamily: 'custom-font' }}>{country}</Text>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
              <Ionicons name={weatherState} size={140} color={COLORS.primary} />
              {temperature !== '' && (
                <Text style={{ fontSize: 50, color: COLORS.primary }}>{(temperature - 273).toFixed(1)}&deg;C</Text>
              )}
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 50, marginLeft: -50 }}>
              {tempMax !== '' && (
                <Text style={{ fontSize: 20, color: COLORS.black, marginLeft: 40, fontFamily: 'custom-font' }}>Température max: {(tempMax - 273).toFixed(1)}&deg; C</Text>
              )}
              {tempMin !== '' && (
                <Text style={{ fontSize: 20, color: COLORS.black, marginLeft: 35, marginTop: 10, fontFamily: 'custom-font' }}>Température min: {(tempMin - 273).toFixed(1)}&deg; C</Text>
              )}
              {windSpeed !== '' && (
                <Text style={{ fontSize: 20, color: COLORS.black, marginLeft: 35, marginTop: 10, fontFamily: 'custom-font' }}>Vitesse du vent: {windSpeed} km/h</Text>
              )}
              {humidity !== '' && (
                <Text style={{ fontSize: 20, color: COLORS.black, marginLeft: 35, marginTop: 10, fontFamily: 'custom-font' }}>Humidité:  {humidity}%</Text>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mediumLight,
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font',
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
  fond: {
    padding: 15,
    backgroundColor: COLORS.light,
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
});
