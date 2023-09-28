import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import Trombinoscope from '../WidgetFaces/Trombinoscope';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: [
      {
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        id: "1",
        imageUri: "https://images.pexels.com/photos/56618/seagull-sky-holiday-bird-56618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }
      // ...
    ]
  })
}));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: () => ({
      params: {
        token: 'mockToken',
        id: 'mockId'
      }
    }),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  };
});

describe('<Trombinoscope />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { getByPlaceholderText } = render(<Trombinoscope />);
    await waitFor(() => {
      expect(getByPlaceholderText('Rechercher un contact...')).toBeTruthy();
    });
  });

  it('has initial state correctly set', async () => {
    const { queryByText } = render(<Trombinoscope />);
    expect(queryByText('John')).toBeNull();
    expect(queryByText('john.doe@example.com')).toBeNull();
  });
});
