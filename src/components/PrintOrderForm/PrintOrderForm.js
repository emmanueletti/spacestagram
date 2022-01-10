import React, { useContext } from 'react';
import { ImagesDataContext } from '../../Providers/ImagesDataProvider';

export default function PrintOrderForm() {
  const ImagesData = useContext(ImagesDataContext);
  return <div>order a print</div>;
}
