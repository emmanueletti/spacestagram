import React, { useContext } from 'react';
import { ImagesDataContext } from '../../Providers/ImagesDataProvider';
import ImageCardItem from '../ImageCardItem/ImageCardItem';
import Loading from '../Loading/Loading';
import styles from './ImageCardList.module.scss';

export default function ImageCardList() {
  const imagesData = useContext(ImagesDataContext);
  const images = imagesData.map((image) => (
    <ImageCardItem key={image.date} {...image} />
  ));

  return (
    <section className={styles['main-container']}>
      {images.length ? images : <Loading />}
    </section>
  );
}
