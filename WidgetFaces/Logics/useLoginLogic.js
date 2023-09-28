import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

const TIMEOUT_DURATION = 10000;

const useLoginLogic = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameValidated, setUsernameValidated] = useState(true);
  const [passwordValidated, setPasswordValidated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setIsLoading(true);
    let isValid = true;

    if (!username.trim()) {
      setUsernameValidated(false);
      isValid = false;
    } else {
      setUsernameValidated(true);
    }

    if (!password.trim()) {
      setPasswordValidated(false);
      isValid = false;
    } else {
      setPasswordValidated(true);
    }

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetchWithTimeout('https://masurao.fr/api/employees/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Group-Authorization': Constants.expoConfig.extra.apikey,
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      });

      const data = await response.json();

      if (response.status === 200) {
        setUsername('');
        setPassword('');
        navigation.navigate('Menu', { token: data.access_token });
      } else if (response.status === 401) {
        alert(data.detail);
      } else if (response.status === 422) {
        alert('Erreur de validation: ' + JSON.stringify(data.detail));
      } else {
        alert('Une erreur s\'est produite lors de la connexion.');
      }
    } catch (error) {
      if (error.message === 'Request timed out') {
        alert('La demande a expiré. Veuillez réessayer.');
      } else if (error.name === 'TypeError') {
        alert('Erreur de réseau.');
      } else {
        alert('Erreur de serveur.');
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const fetchWithTimeout = (url, options) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), TIMEOUT_DURATION)
      ),
    ]);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    usernameValidated,
    setUsernameValidated,
    passwordValidated,
    setPasswordValidated,
    isLoading,
    handleLogin
  };
};

export default useLoginLogic;
