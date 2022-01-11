import React, { useContext } from 'react';
import { ImagesDataContext } from '../../Providers/ImagesDataProvider';

// COMPONENTS
import ImageCardItem from '../ImageCardItem/ImageCardItem';
import Loading from '../Loading/Loading';

// STYLES
import styles from './ImageCardList.module.scss';

export default function ImageCardList() {
  const images = useContext(ImagesDataContext).map((image) => (
    <ImageCardItem key={image.date} {...image} />
  ));

  return (
    <section className={styles['main-container']}>
      {images.length ? (
        images
      ) : (
        <Loading
          style={{
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
    </section>
  );
}
