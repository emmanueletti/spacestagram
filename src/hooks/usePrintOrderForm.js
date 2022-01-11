import { useState } from 'react';

export default function usePrintOrderForm() {
  const [state, setState] = useState({
    loading: false,
    quantity: 1,
    quote: { unitCosts: '0.00', shipping: '0.00', totalCosts: '0.00' },
  });

  const updateQuantity = (value) => {
    setState((prev) => {
      if (value > 20) return { ...prev, quantity: 20 };
      if (value < 0) return { ...prev, quantity: 1 };
      return { ...prev, quantity: Math.round(value) };
    });
  };

  const getQuote = () => {
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
            copies: state.quantity,
            attributes: { color: 'black' },
            assets: [{ printArea: 'default' }],
          },
        ],
      }),
    };

    setState((prev) => {
      return { ...prev, loading: true };
    });

    fetch('https://api.sandbox.prodigi.com/v4.0/quotes', config)
      .then((resp) => resp.json())
      .then((data) => {
        const unitCosts = data.quotes[0].costSummary.items.amount;
        const shipping = data.quotes[0].costSummary.shipping.amount;
        const totalCosts = data.quotes[0].costSummary.totalCost.amount;
        setState((prev) => {
          return {
            ...prev,
            quote: { ...prev.quote, unitCosts, shipping, totalCosts },
          };
        });
        setState((prev) => {
          return { ...prev, loading: false };
        });
      })
      .catch((err) => new Error(err));
  };

  return [state, updateQuantity, getQuote];
}
