import React, { useState, useEffect } from 'react';
import testData from '../lib/testData';

export const ImagesDataContext = React.createContext();

export default function ImagesDataProvider({ children }) {
  const [imagesData, setImagesData] = useState([]);

  // Fetch image from NASA APOD API
  useEffect(() => {
    // fetch(
    //   `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NOT_SECURE_API_KEY}&start_date=2022-01-01&end_date=2022-01-08`
    // )
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     console.log('image recieved', data);
    //     setImagesData((prev) => data);
    //   })
    //   .catch((err) => console.log(err));

    setImagesData((prev) => testData);
  }, []);
  return (
    <ImagesDataContext.Provider value={testData}>
      {children}
    </ImagesDataContext.Provider>
  );
}
