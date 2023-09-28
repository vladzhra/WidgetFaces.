import { useState, useEffect } from 'react';
import axios from 'axios';

const useCitationDuJourLogic = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios.get('https://api.quotable.io/random?language=fr')
      .then(response => {
        setQuote(response.data.content);
        setAuthor(response.data.author);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération de la citation :", error);
      });
  }, []);

  return {
    quote,
    author
  };
};

export default useCitationDuJourLogic;
