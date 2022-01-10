import React from 'react';
import styles from './AppLayout.module.css';

export default function AppLayout({ children }) {
  return (
    <div className={styles.container}>
      <header>
        <h1>Spacestagram</h1>
        <h4>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</h4>
      </header>
      <main className={styles['main-content-container']}>{children}</main>
    </div>
  );
}
