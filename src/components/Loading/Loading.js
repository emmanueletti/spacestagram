import React from 'react';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Loading({ style }) {
  return (
    <div style={style}>
      <FontAwesomeIcon icon={faSpinner} spin size='4x' />
    </div>
  );
}
