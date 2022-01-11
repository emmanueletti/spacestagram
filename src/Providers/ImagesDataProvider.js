import React, { useState, useEffect } from 'react';

export const ImagesDataContext = React.createContext();

export default function ImagesDataProvider({ children }) {
  const [imagesData, setImagesData] = useState([]);

  // Fetch image from NASA APOD API
  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=2022-01-01`
    )
      .then((resp) => resp.json())
      .then((data) => {
        const reversed = data.reverse();
        setImagesData((prev) => reversed);
      })
      .catch((err) => new Error(err));
  }, []);
  return (
    <ImagesDataContext.Provider value={imagesData}>
      {children}
    </ImagesDataContext.Provider>
  );
}
