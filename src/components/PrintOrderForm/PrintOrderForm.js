import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// COMPONENTS
import { ImagesDataContext } from '../../Providers/ImagesDataProvider';
import Loading from '../Loading/Loading';

// CUSTOM HOOKS
import usePrintOrderForm from '../../hooks/usePrintOrderForm';
import useLocalStorage from '../../hooks/useLocalStorage';

// STYLES
import styles from './PrintOrderForm.module.scss';

export default function PrintOrderForm() {
  const providedImages = useContext(ImagesDataContext);
  let params = useParams();
  const filteredImage = providedImages.filter(
    (image) => image.date === params.imageDate
  );

  const [state, updateQuantity, getQuote] = usePrintOrderForm();

  const [localImage, setLocalImage] = useLocalStorage('image', {
    url: '',
    title: '',
  });

  // On initial load, and everytime providedImages internally changes (due to page refresh
  // and broser naviagtion), save info to local storage
  useEffect(() => {
    if (!filteredImage[0]) return;
    if (filteredImage[0].date !== localImage.date) {
      setLocalImage({
        url: filteredImage[0]?.url,
        title: filteredImage[0]?.title,
      });
    }
  }, [providedImages]);

  return (
    <section className={styles['main-container']}>
      <div className={styles['image-container']}>
        {localImage.url ? (
          <img src={localImage.url} alt={localImage.title} />
        ) : (
          <Loading
            style={{
              width: '100%',
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        )}
      </div>
      <div>
        <h2>Framed Fine Art Print</h2>
        <p>
          High quality Giclee printed on sustainably sourced paper and frames in
          a classic black wooden frame. Express shipped right to your Canadian
          address.
        </p>
        <a href='https://www.prodigi.com/products/framed-prints/classic-frames/'>
          Powered by Prodigi
        </a>

        {state.loading ? (
          <Loading style={{ textAlign: 'center', margin: '1rem 0' }} />
        ) : (
          <>
            <p>Print: ${state.quote.unitCosts}</p>
            <p>Shipping: ${state.quote.shipping}</p>
            <p>Total Cost: ${state.quote.totalCosts} </p>
          </>
        )}
        <label htmlFor='quantity'>Quantity (1-20) </label>
        <input
          name='quantity'
          type='number'
          placeholder='1'
          min='1'
          max='20'
          value={state.quantity}
          onChange={(e) => updateQuantity(e.target.value)}
          className={styles.input}
        />
        <button
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            getQuote();
          }}>
          GET QUOTE
        </button>
      </div>
    </section>
  );
}
