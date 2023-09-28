import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Login from '../WidgetFaces/Login';
import { NavigationContainer } from '@react-navigation/native';
import { cleanup } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

describe('<Login />', () => {
  const renderWithNavigation = (component) => {
    return render(
      <NavigationContainer>
        {component}
      </NavigationContainer>
    );
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ access_token: 'mocked_token' }),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(cleanup);

  it('renders correctly', async () => {
    const { getByText, getByPlaceholderText } = renderWithNavigation(<Login />);
    await waitFor(() => {
      expect(getByText('WidgetFaces.')).toBeTruthy();
    });

    expect(getByText('Le Trombinoscope Mobile')).toBeTruthy();
    expect(getByPlaceholderText('Nom d\'utilisateur')).toBeTruthy();
    expect(getByPlaceholderText('Mot de passe')).toBeTruthy();
  });

  it('shows validation errors when fields are empty and login button is pressed', async () => {
    const { getByText, getByTestId } = renderWithNavigation(<Login />);
    const loginButton = await waitFor(() => getByText('Se connecter'));

    act(() => {
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(getByTestId('usernameError')).toHaveTextContent('Le champ est obligatoire');
      expect(getByTestId('passwordError')).toHaveTextContent('Ce champ est obligatoire');
    });
  });

  it('logs in with correct username and password', async () => {
    const { getByText, getByPlaceholderText } = renderWithNavigation(<Login />);

    const usernameInput = await waitFor(() => getByPlaceholderText('Nom d\'utilisateur'));
    const passwordInput = await waitFor(() => getByPlaceholderText('Mot de passe'));

    fireEvent.changeText(usernameInput, 'oliver.lewis@masurao.jp');
    fireEvent.changeText(passwordInput, 'password');

    const loginButton = await waitFor(() => getByText('Se connecter'));
    act(() => {
      fireEvent.press(loginButton);
    });

    expect(fetch).toHaveBeenCalledWith('https://masurao.fr/api/employees/login', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        email: 'oliver.lewis@masurao.jp',
        password: 'password'
      })
    }));
  });

});