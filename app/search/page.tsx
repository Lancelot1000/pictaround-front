'use client';

import { useEffect, useState } from 'react';

import usePhotoPopup from '@/app/hooks/usePhotoPopup';
import Map from '@/app/search/_components/Map';
import Categories from '@/components/Categories';

import Photos from './_components/Photos';

export default function Page() {
  const { open, LocationInfoComponent } = usePhotoPopup();

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCoordinates([position.coords.longitude, position.coords.latitude]);
    });
  }, []);

  return (
    <div>
      <Categories />
      <Map loc={coordinates} popupOpenAction={open} />
      <Photos popupOpenAction={open} />
      <LocationInfoComponent />
    </div>
  );
}