import React, { useState, useEffect } from 'react';

// STYLES
import styles from './AppLayout.module.scss';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

// COMPONENTS
import Button from '../Button/Button';

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
    if (window.pageYOffset > averageCardHeight * 1.5) {
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
        <Button
          handleClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: ' 20px',
            right: '20px',
            borderRadius: '50%',
            height: '80px',
            width: ' 80px',
            backgroundColor: '#919eab',
            color: 'white',
          }}>
          <FontAwesomeIcon icon={faArrowUp} size='2x' />
        </Button>
      )}
    </div>
  );
}
