import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import Météo from '../WidgetFaces/Météo';

jest.mock('expo-location', () => {
  return {
    requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
    getCurrentPositionAsync: jest.fn().mockResolvedValue({
      coords: {
        latitude: 48.8566,
        longitude: 2.3522,
      }
    }),
    reverseGeocodeAsync: jest.fn().mockResolvedValue([
      { city: 'Paris', country: 'France' }
    ])
  };
});

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    main: {
      temp: 293.15,
      temp_min: 290.15,
      temp_max: 295.15,
      humidity: 65
    },
    wind: {
      speed: 3.1
    },
    weather: [{ id: 800 }],
    coord: {
      lat: 48.8566,
      lon: 2.3522
    }
  })
}));

describe('<Météo />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<Météo />);
    expect(getByText(/Météo/)).toBeTruthy();
  });

  it('has initial state correctly set', async () => {
    const { queryByText } = render(<Météo />);
    expect(queryByText('Paris')).toBeNull();
    expect(queryByText('France')).toBeNull();
    expect(queryByText(/\d{1,2}\.\d{1}&deg; C/)).toBeNull();
  });

  it('fetches weather data and displays it', async () => {
    const { getByText } = render(<Météo />);
    await waitFor(() => {
      expect(getByText('Paris')).toBeTruthy();
      expect(getByText('France')).toBeTruthy();
      // expect(getByText(/20.0&deg; C/)).toBeTruthy();
    });
  });
});
