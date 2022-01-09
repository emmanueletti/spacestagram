import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import ImageCardList from './ImageCardList/ImageCardList';
import Loading from './Loading/Loading';

export default function App() {
  // example of NASA API usage
  // https://api.nasa.gov/planetary/apod?api_key=LuKnqONyCAwEEXTlhIrm7e1mgdAldqBnXlIFIeQp
  const [imagesData, setImagesData] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NOT_SECURE_API_KEY}&start_date=2022-01-01&end_date=2022-01-08`
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log('image recieved', data);
        setImagesData((prev) => data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <h1>Spacestagram</h1>
        <p>Brought to you by NASA's Astronomy of the Day API</p>
      </header>
      <main>
        {imagesData.length ? (
          <ImageCardList imagesData={imagesData} />
        ) : (
          <Loading />
        )}
      </main>
    </div>
  );
}
