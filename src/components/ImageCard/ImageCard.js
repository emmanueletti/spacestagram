import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './ImageCard.module.scss';
import Button from '../Button/Button';

export default function ImageCard({ id, date, title, url, explanation }) {
  let navigate = useNavigate();
  const navigateToOrderPage = () => {
    navigate(`/order-prints/${date}`);
  };
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike((prev) => !prev);
  };

  return (
    <div className={styles['card-container']}>
      <img className={styles.image} alt={title} src={url} />
      <div className={styles['card-text-container']}>
        <h4>
          {title} ({date})
        </h4>
        <p>{explanation}</p>
        <div className={styles['btns-container']}>
          <Button handleClick={toggleLike}>
            {like ? (
              <FontAwesomeIcon icon={faHeart} color='red' />
            ) : (
              <FontAwesomeIcon icon={farHeart} />
            )}
          </Button>
          <Button handleClick={navigateToOrderPage}>Order Print</Button>
        </div>
      </div>
    </div>
  );
}
