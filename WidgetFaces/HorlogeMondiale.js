import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

import COLORS from '../assets/colors';
import useHorlogeMondialeLogic from './Logics/useHorlogeMondialeLogic';
// import UseTimeZoneSearchLogic from './Logics/useTimeZoneSearchLogic';
import TimeZoneSearch from './TimeZoneSearch';

class Horloge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heure: '',
      timezone: props.timezone,
    };
  }

  componentDidMount() {
    this.obtenirHeure();
    this.interval = setInterval(() => {
      this.obtenirHeure();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  obtenirHeure() {
    fetch(`https://worldtimeapi.org/api/timezone/${this.state.timezone}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          heure: data.datetime,
        });
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de l\'heure :', error);
      });
  }

  formaterHeure(heure, timezone) {
    const date = new Date(heure);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    if (timezone) {
      options.timeZone = timezone;
    }
    return date.toLocaleString(undefined, options);
  }

  render() {
    return (
      <Text style={styles.heure}>
        {this.formaterHeure(this.state.heure, this.state.timezone)}
      </Text>
    );
  }
}

export default function HorlogeMondiale() {
  const { selectedTimezones, setTimeZoneSearchVisible, currentPhoneTime, setShowRemoveButtons, isTimeZoneSearchVisible, handleTimeZoneSelect, handleRemoveTimezone } = useHorlogeMondialeLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horloge</Text>
      <View style={styles.topSection}>
        <Text style={styles.phoneTime}>
          {currentPhoneTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })}
        </Text>
        <View style={[styles.midSection]}>
            <TouchableOpacity onPress={() => { setTimeZoneSearchVisible(true); setShowRemoveButtons(false);}} style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.textFont}>Timezones sélectionnées :</Text>
        <FlatList
          data={selectedTimezones}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.timezoneRow}>
              <View style={styles.timezoneInfo}>
                <Text style={styles.textFont}>{item}</Text>
              </View>
              <View style={styles.timezoneClock}>
                <Horloge timezone={item} />
              </View>
                <TouchableOpacity onPress={() => handleRemoveTimezone(item)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <TimeZoneSearch
        visible={isTimeZoneSearchVisible}
        onClose={() => setTimeZoneSearchVisible(false)}
        onTimezoneSelect={handleTimeZoneSelect}
        selectedTimezones={selectedTimezones}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.mediumLight,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  midSection: {
    marginLeft: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row', 
    marginTop: 20
  },
  bottomSection: {
    flex: 3,
    width: '100%',
  },
  phoneTime: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  heure: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  removeButton: {
    fontSize: 40,
    marginLeft: 10,
  },
  timezoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    borderRadius: 10,
  },
  timezoneInfo: {
    flex: 1,
    marginLeft: 10,
  },
  timezoneText: {
    fontSize: 18,
    fontFamily: 'custom-font'
  },
  timezoneClock: {
    flex: 2,
    alignItems: 'flex-end',
    fontFamily: 'custom-font'
  },
  removeButtonText: {
    color: COLORS.mediumLight,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'custom-font'
  },
  textFont: {
    fontFamily: 'custom-font',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 4,
    marginLeft: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: COLORS.mediumLight,
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'custom-font',
  },
});

