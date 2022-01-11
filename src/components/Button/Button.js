import React from 'react';

export default function Button({ children, handleClick, style }) {
  const disabledStyle = {
    backgroundColor: '#f4f6f8', // polaris token color-sky-light
    color: '#c4cdd5', // polaris token color-sky-dark
    borderColor: 'white',
    transform: 'none',
  };
  const renderedStyle = handleClick ? style : disabledStyle;
  return (
    <button style={renderedStyle} onClick={handleClick}>
      {children}
    </button>
  );
}
