import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ImageCard.module.scss';
import Button from '../Button/Button';

export default function ImageCard({
  id,
  date,
  title,
  url,
  explanation,
  setCurrentPage,
}) {
  let navigate = useNavigate();
  const navigateToOrderPage = () => {
    navigate(`/order-prints/${date}`);
  };
  return (
    <div className={styles['card-container']}>
      <img className={styles.image} alt={title} src={url} />
      <div className={styles['card-text-container']}>
        <h4>
          {title} ({date})
        </h4>
        <p>{explanation}</p>
        {/* <Button>Expand</Button> */}
        <div className={styles['btns-container']}>
          <Button>Like</Button>
          <Button handleClick={navigateToOrderPage}>Order Print</Button>
        </div>
      </div>
    </div>
  );
}
