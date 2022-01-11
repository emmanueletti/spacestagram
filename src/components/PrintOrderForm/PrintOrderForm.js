import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImagesDataContext } from '../../Providers/ImagesDataProvider';
import styles from './PrintOrderForm.module.scss';

export default function PrintOrderForm() {
  const ImagesData = useContext(ImagesDataContext);
  let params = useParams();

  const image = ImagesData.filter((image) => image.date === params.imageDate);

  const [quantity, setQuantity] = useState(1);
  const [quote, setQuote] = useState({
    unitCosts: '0.00',
    shipping: '0.00',
    totalCosts: '0.00',
  });

  const handleQuanityChange = (e) => {
    setQuantity((prev) => {
      if (e.target.value > 20) return 20;
      if (e.target.value < 0) return 1;
      return Math.round(e.target.value);
    });
  };

  const getQuote = (e) => {
    e.preventDefault();
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.REACT_APP_NOT_SECURE_PRODIGI_SANDBOX_API_KEY,
      },
      body: JSON.stringify({
        shippingMethod: 'Express',
        destinationCountryCode: 'CA',
        currencyCode: 'USD',
        items: [
          {
            sku: 'GLOBAL-CFP-11X14',
            copies: quantity,
            attributes: { color: 'black' },
            assets: [{ printArea: 'default' }],
          },
        ],
      }),
    };

    fetch('https://api.sandbox.prodigi.com/v4.0/quotes', config)
      .then((resp) => resp.json())
      .then((data) => {
        const unitCosts = data.quotes[0].costSummary.items.amount;
        const shipping = data.quotes[0].costSummary.shipping.amount;
        const totalCosts = data.quotes[0].costSummary.totalCost.amount;
        setQuote((prev) => {
          return { ...prev, unitCosts, shipping, totalCosts };
        });
      })
      .catch((err) => new Error(err));
  };

  return (
    <div className={styles['main-container']}>
      <div className={styles['image-container']}>
        <img src={image[0].url} alt={image[0].title} />
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
        <p>Print: ${quote.unitCosts}</p>
        <p>Shipping: ${quote.shipping}</p>
        <p>Total Cost: ${quote.totalCosts} </p>
        <label htmlFor='quantity'>Quantity (1-20) </label>
        <input
          name='quantity'
          type='number'
          placeholder='1'
          min='1'
          max='20'
          value={quantity}
          onChange={handleQuanityChange}
          className={styles.input}
        />
        <button className={styles.button} onClick={getQuote}>
          GET QUOTE
        </button>
      </div>
    </div>
  );
}
