import React, { useState, useEffect } from 'react';
import styles from './AppLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function AppLayout({ children }) {
  const [scrollBtn, setScrollBtn] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const averageCardHeight = 400;
  const handleScrollEvent = () => {
    if (window.pageYOffset > averageCardHeight) {
      setScrollBtn(true);
    } else {
      setScrollBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <div className={styles['main-container']}>
      <header>
        <h1>Spacestagram</h1>
        <h4>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</h4>
      </header>
      <main className={styles['content-container']}>{children}</main>
      {scrollBtn && (
        <button onClick={scrollToTop} className={styles['scroll-to-top']}>
          <FontAwesomeIcon icon={faArrowUp} size='2x' />
        </button>
      )}
    </div>
  );
}
