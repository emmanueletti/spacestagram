import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './ImageCardItem.module.scss';
import Button from '../Button/Button';

export default function ImageCard({ date, title, url, explanation }) {
  const isVideo = url.includes('youtube');

  let navigate = useNavigate();
  const navigateToOrderPage = () => {
    navigate(`/order-prints/${date}`);
  };

  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike((prev) => !prev);
  };

  return (
    <div className={styles['main-container']}>
      {isVideo ? (
        <iframe title={title} src={url}></iframe>
      ) : (
        <img alt={title} src={url} />
      )}
      <div className={styles['text-container']}>
        <h4>
          {title} ({date})
        </h4>
        <p>{explanation}</p>
        <div className={styles['buttons-container']}>
          <Button handleClick={toggleLike}>
            {like ? (
              <FontAwesomeIcon icon={faHeart} color='red' />
            ) : (
              <FontAwesomeIcon icon={farHeart} />
            )}
          </Button>
          <Button
            style={{ backgroundColor: '#50b83c', color: 'white' }}
            handleClick={isVideo ? null : navigateToOrderPage}>
            Order Print
          </Button>
        </div>
      </div>
    </div>
  );
}
