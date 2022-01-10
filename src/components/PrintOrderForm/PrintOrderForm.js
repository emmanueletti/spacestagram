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
    unitCosts: '0.00',
    shipping: '0.00',
    totalCost: '0.00',
  });

  // 11x14 print
  // sku - GLOBAL-CFP-11X14
  // Classic Frame Fine Art Print No Mount / No Mat Perspex Glaze
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
            copies: 1,
            attributes: { color: 'black' },
            assets: [{ printArea: 'default' }],
          },
        ],
      }),
    };

    fetch('https://api.sandbox.prodigi.com/v4.0/quotes', config)
      .then((resp) => resp.json())
      .then((data) => console.log(data))
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
      <p>Total Cost: ${quote.totalCost} </p>
      <Button handleClick={getQuote}>GET QUOTE</Button>
      <form>
        <fieldset id='sign_up'>
          <legend>Order Form</legend>
          <div>
            <label class='db fw6 lh-copy f6' htmlFor='email-address'>
              Email
            </label>
            <input
              class='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
              type='email'
              name='email-address'
              id='email-address'
            />
          </div>
          <div class='mv3'>
            <label class='db fw6 lh-copy f6' htmlFor='password'>
              Password
            </label>
            <input
              class='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
              type='password'
              name='password'
              id='password'
            />
          </div>
          <label class='pa0 ma0 lh-copy f6 pointer'>
            <input type='checkbox' /> Remember me
          </label>
        </fieldset>
        <div class=''>
          <input
            class='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
            type='submit'
            value='Sign in'
          />
        </div>
        <div class='lh-copy mt3'>
          <a href='#0' class='f6 link dim black db'>
            Sign up
          </a>
          <a href='#0' class='f6 link dim black db'>
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  );
}
