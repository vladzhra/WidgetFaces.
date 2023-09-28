import { useState } from 'react';
import Constants from 'expo-constants';

const useOrthographeLogic = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChatGPT = async () => {
    setIsLoading(true);
    const url = "https://luna-aibot-demo-oai.openai.azure.com/openai/deployments/WidgetFaces/chat/completions?api-version=2023-07-01-preview";

    const data = {
      messages: [
        { role: "user", content: "Corrige cette phrase en français : " + userMessage }
      ],
      max_tokens: 800,
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 0.95,
      stop: null
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': Constants.expoConfig.extra.apikeychat
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        const botResponse = data.choices[0].message.content;
        setChatbotResponse(botResponse);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  return { userMessage, setUserMessage, chatbotResponse, handleChatGPT, isLoading};
};

export default useOrthographeLogic;
