import { useState, useEffect } from 'react';
import { Linking } from 'react-native';

const useNewsLogic = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async () => {
    const API_URL = 'http://api.mediastack.com/v1/news?access_key=2468b23b3aa91d740045bdf9172e0f34&limit=20&countries=fr&source=fr&languages=fr';
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setNewsData(json.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const openURL = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Failed to open URI: " + url);
      }
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { newsData, isLoading, openURL };
};

export default useNewsLogic;
