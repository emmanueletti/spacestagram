import React, { useContext } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import Loading from '../Loading/Loading';
import { ImagesDataContext } from '../../Providers/ImagesDataProvider';

export default function ImageCardList() {
  const imagesData = useContext(ImagesDataContext);
  const images = imagesData.map((image) => (
    <ImageCard key={image.date} {...image} />
  ));

  return <>{images.length ? images : <Loading />}</>;
}
