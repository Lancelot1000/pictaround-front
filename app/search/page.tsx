'use client';


import { Suspense, useEffect, useState } from 'react';

import Categories from '@/components/Categories';
import Map from '@/app/search/_components/Map';

import Photos from './_components/Photos';

export default function Page() {

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
      <Map loc={coordinates} />
      <Suspense fallback={<div>LOADING___!!!</div>}>
        <Photos />
      </Suspense>
    </div>
  );
}