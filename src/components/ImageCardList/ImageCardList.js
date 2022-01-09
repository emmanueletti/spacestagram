import React from 'react';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageCardList({ imagesData }) {
  const images = imagesData.map((image) => (
    <ImageCard key={image.date} {...image} />
  ));
  return <div>{images}</div>;
}
