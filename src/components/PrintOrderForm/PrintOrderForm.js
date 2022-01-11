import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../Button/Button';
import { ImagesDataContext } from '../../Providers/ImagesDataProvider';

export default function PrintOrderForm() {
  const ImagesData = useContext(ImagesDataContext);
  let params = useParams();
  const image = ImagesData.filter((image) => image.date === params.imageDate);
  const [orderForm, setOrderForm] = useState({});
  const [quote, setQuote] = useState({
    unitCosts: '5.00',
    shipping: '0.00',
    totalCosts: '0.00',
  });

  // 11x14 print
  // sku - GLOBAL-CFP-11X14
  // Classic Frame Fine Art Print No Mount / No Mat Perspex Glaze
  const getQuote = (e) => {
    console.log('fired');
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
            copies: 1,
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
    <div>
      <img style={{ width: '100%' }} src={image[0].url} alt={image[0].title} />
      <h2>Framed Fine Art Print</h2>
      <p>
        High quality Giclee print on sustainably sourced paper. Framed in a
        simple black classically styled wooden frame with "Tru View Museum Glass
        glaze". Express shipped right to your Canadian address.{' '}
      </p>
      <a href='https://www.prodigi.com/products/framed-prints/classic-frames/'>
        Powered by Prodigi
      </a>
      <p>Print: ${quote.unitCosts}</p>
      <p>Shipping: ${quote.shipping}</p>
      <p>Total Cost: ${quote.totalCosts} </p>
      <Button handleClick={getQuote}>GET QUOTE</Button>
    </div>
  );
}
