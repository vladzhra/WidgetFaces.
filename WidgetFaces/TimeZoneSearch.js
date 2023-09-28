import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Button, Modal, StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
import COLORS from '../assets/colors';


const screenHeight = Dimensions.get('window').height;

const cityChosen = [
  "Africa/Abidjan",
  "Africa/Algiers",
  "Africa/Bissau",
  "Africa/Cairo",
  "Africa/Casablanca",
  "Africa/Ceuta",
  "Africa/El_Aaiun",
  "Africa/Johannesburg",
  "Africa/Juba",
  "Africa/Khartoum",
  "Africa/Lagos",
  "Africa/Maputo",
  "Africa/Monrovia",
  "Africa/Nairobi",
  "Africa/Ndjamena",
  "Africa/Sao_Tome",
  "Africa/Tripoli",
  "Africa/Tunis",
  "Africa/Windhoek",
  "America/Anchorage",
  "America/Argentina/Buenos_Aires",
  "America/Bogota",
  "America/Caracas",
  "America/Cayenne",
  "America/Chicago",
  "America/Denver",
  "America/Guatemala",
  "America/Indiana/Indianapolis",
  "America/La_Paz",
  "America/Lima",
  "America/Los_Angeles",
  "America/Mexico_City",
  "America/New_York",
  "America/Nuuk",
  "America/Santiago",
  "America/Santo_Domingo",
  "America/Sao_Paulo",
  "America/Vancouver",
  "Asia/Baghdad",
  "Asia/Bangkok",
  "Asia/Dubai",
  "Asia/Hong_Kong",
  "Asia/Jakarta",
  "Asia/Jerusalem",
  "Asia/Kabul",
  "Asia/Qatar",
  "Asia/Seoul",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Atlantic/Azores",
  "Atlantic/Bermuda",
  "Atlantic/Canary",
  "Atlantic/Cape_Verde",
  "Atlantic/Faroe",
  "Atlantic/Madeira",
  "Atlantic/South_Georgia",
  "Atlantic/Stanley",
  "Australia/Adelaide",
  "Australia/Brisbane",
  "Australia/Darwin",
  "Australia/Melbourne",
  "Australia/Perth",
  "Australia/Sydney",
  "Europe/Andorra",
  "Europe/Astrakhan",
  "Europe/Athens",
  "Europe/Belgrade",
  "Europe/Berlin",
  "Europe/Brussels",
  "Europe/Bucharest",
  "Europe/Budapest",
  "Europe/Chisinau",
  "Europe/Dublin",
  "Europe/Gibraltar",
  "Europe/Helsinki",
  "Europe/Istanbul",
  "Europe/Kaliningrad",
  "Europe/Kirov",
  "Europe/Kyiv",
  "Europe/Lisbon",
  "Europe/London",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Minsk",
  "Europe/Moscow",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/Samara",
  "Europe/Saratov",
  "Europe/Simferopol",
  "Europe/Sofia",
  "Europe/Tallinn",
  "Europe/Tirane",
  "Europe/Ulyanovsk",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Volgograd",
  "Europe/Warsaw",
  "Europe/Zurich",
  "Indian/Chagos",
  "Indian/Maldives",
  "Indian/Mauritius"
  ]

const TimeZoneSearch = ({ visible, onClose, onTimezoneSelect, selectedTimezones }) => {
  const [searchText, setSearchText] = useState('');
  const [timezones, setTimezones] = useState(cityChosen);
  const [filteredTimezones, setFilteredTimezones] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const filtered = timezones.filter((timezone) => {
      const lowercaseTimezone = timezone.toLowerCase();
      return (
        !selectedTimezones.includes(timezone) &&
        (lowercaseTimezone.startsWith(searchText.toLowerCase()) || 
          lowercaseTimezone.includes(`/${searchText.toLowerCase()}`)) &&
        (lowercaseTimezone.startsWith('africa/') ||
          lowercaseTimezone.startsWith('america/') ||
          lowercaseTimezone.startsWith('antarctica/') ||
          lowercaseTimezone.startsWith('asia/') ||
          lowercaseTimezone.startsWith('atlantic/') ||
          lowercaseTimezone.startsWith('australia/') ||
          lowercaseTimezone.startsWith('europe/') ||
          lowercaseTimezone.startsWith('indian/') ||
          lowercaseTimezone.startsWith('pacific/'))
      );
    });
    setFilteredTimezones(filtered);
  }, [searchText, timezones, selectedTimezones]);

  const handleSelectTimezone = (timezone) => {
    setSelectedCity(timezone);
  };

  const handleValidateTimezone = () => {
    if (selectedCity) {
      onTimezoneSelect(selectedCity);
      setSelectedCity(null);
      setSearchText('');
    }
  };

return (
  <Modal animationType="slide" transparent={false} visible={visible}>
    <View style={[{ backgroundColor: COLORS.mediumLight }]}>
      <Text style={styles.title}>Choisir une timezone</Text>
      <View style={styles.searchContainer}>
        {/* <Text style={styles.title}>Tâches du jour</Text> */}
        <TextInput
          placeholder="Rechercher une timezone..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={styles.searchInput}
        />
        <TouchableOpacity
          onPress={() => {
            setSelectedCity(null);
            onClose();
          }}
          style={styles.leaveButton}
        >
          <Text style={styles.leaveButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textDisplay}>Ville sélectionnée :</Text>
      {selectedCity ? (
        <View>
          <Text style={styles.selectedCity}>{selectedCity}</Text>
        </View>) : (<Text></Text>)}
      <TouchableOpacity
        onPress={handleValidateTimezone}
        style={[ styles.button, { backgroundColor: selectedCity ? COLORS.primary : COLORS.neutral }, ]}disabled={!selectedCity}
      >
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>
      <View style={[styles.container, { height: screenHeight * 0.8 }]}>
        {filteredTimezones.length === 0 && !selectedCity ? (
          <Text style={styles.noCityText}>Aucune ville trouvée</Text>
        ) : null}
        <FlatList
          data={filteredTimezones}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectTimezone(item)}>
              <Text style={styles.textDisplay}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
    <View style={[{ backgroundColor: COLORS.mediumLight }]}></View>
  </Modal>
);
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    width: '90%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: COLORS.neutral,
    borderRadius: 5,
    borderColor: '#BDA18A',
    borderWidth: 1,
    color: '#000',
    fontFamily: 'custom-font',
    marginTop: 100,
  },
  textDisplay: {
    left: 10,
    fontFamily: 'custom-font',
  },
  selectedCity: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'custom-font',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#F5EFE6',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'custom-font',
  },
  leaveButton: {
    backgroundColor: COLORS.primary,
    padding: 6,
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 90,
  },
  leaveButtonText: {
    color: COLORS.mediumLight,
    fontSize: 20,
  },
  noCityText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'custom-font',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font',
    marginTop: 40,
    marginBottom: -40,
  },
});

export default TimeZoneSearch;