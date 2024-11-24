'use client';

import { Suspense, useEffect, useState } from 'react';

import usePhotoPopup from '@/app/hooks/usePhotoPopup';
import Map from '@/app/search/_components/Map';
import Categories from '@/components/Categories';

import Photos from './_components/Photos';

export default function Page() {
  const { open, LocationInfoComponent } = usePhotoPopup();

  const [coordinates, setCoordinates] = useState<Coordinates>([126.976882, 37.574187]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position);
      setCoordinates([position.coords.longitude, position.coords.latitude]);
    });
  }, []);

  return (
    <div>
      <Categories />
      <Map loc={coordinates} popupOpenAction={open} />
      <Suspense fallback={<div>LOADING___!!!</div>}>
        <Photos popupOpenAction={open} />
      </Suspense>
      <LocationInfoComponent />
    </div>
  );
}