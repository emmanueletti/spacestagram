import React from 'react';
import styles from './ImageCard.module.scss';

export default function ImageCard({ date, title, url, explanation }) {
  return (
    <div className={styles['card-container']}>
      <img className={styles.image} alt={title} src={url} />
      <div className={styles['card-text-container']}>
        <h4>
          {title} ({date})
        </h4>
        <p>{explanation}</p>
        <button>Like</button>
      </div>
    </div>
  );
}
