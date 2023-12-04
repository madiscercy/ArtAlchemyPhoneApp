// imageProcessingService.js

const apiUrl =
  'https://v1pu4a0z9b.execute-api.us-east-1.amazonaws.com/api/art-alchemy/process';

export const processImage = async (imageData: string, style: string) => {
  const payload = {imageData, style};
  const headers = {
    'x-api-key': 'pL1nxvneOKaIJ9J1YJOfg93e3SDzxcjXOJYGBmif',
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};
