import { useState, useEffect } from 'react';
import Constants from 'expo-constants';

const useBlagueLogic = () => {
  const [quote, setQuote] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const BlaguesAPI = require('blagues-api');
      const blaguesAPI = new BlaguesAPI(Constants.expoConfig.extra.apikeyblague);
      const data = await blaguesAPI.random();
      setQuote(data.joke);
      setAnswer(data.answer);
    };
    fetchData();
  }, []);

  return {
    quote,
    answer
  };
};

export default useBlagueLogic;
