import React, { useContext } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { ImagesDataContext } from '../../Providers/ImagesDataProvider';

export default function ImageCardList({ setCurrentPage }) {
  const imagesData = useContext(ImagesDataContext);
  const images = imagesData.map((image) => (
    <ImageCard key={image.date} {...image} setCurrentPage={setCurrentPage} />
  ));
  return <>{images}</>;
}
