import React from 'react';
import styles from './Loading.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Loading() {
  return (
    <div className={styles['loading-container']}>
      <FontAwesomeIcon icon={faSpinner} spin size='4x' />
    </div>
  );
}
