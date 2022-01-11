import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

// COMPONENTS
import { ImagesDataContext } from '../../Providers/ImagesDataProvider';
import Loading from '../Loading/Loading';

// CUSTOM HOOKS
import useLocalStorage from '../../hooks/useLocalStorage';
import usePrintOrderForm from '../../hooks/usePrintOrderForm';

// STYLES
import styles from './PrintOrderForm.module.scss';

export default function PrintOrderForm() {
  const [state, updateQuantity, getQuote] = usePrintOrderForm();

  let params = useParams();
  const filteredImage = useContext(ImagesDataContext).filter(
    (image) => image.date === params.imageDate
  );

  // Save image info to localstorage for when user navigates back to print order page
  const [imageData] = useLocalStorage('imageData', {
    url: filteredImage[0]?.url,
    title: filteredImage[0]?.title,
  });

  return (
    <section className={styles['main-container']}>
      <div className={styles['image-container']}>
        {imageData.url ? (
          <img src={imageData?.url} alt={imageData.title} />
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
