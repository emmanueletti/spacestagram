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
    fetch(
      `https://etti-personal-cors-proxy.herokuapp.com/get-quote?quantity=${state.quantity}`
    )
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
