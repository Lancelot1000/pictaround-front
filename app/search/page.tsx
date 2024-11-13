'use client';


import { useHydrateAtoms } from 'jotai/utils';
import { useEffect, useState } from 'react';

import Chips from '@/app/_components/Categories';
import Map from '@/app/_components/Map';
import { categoriesAtom } from '@/atom/common';
import { findCategories } from '@/atom/fetch';

import Photos from './_components/Photos';

export default function Page({ categories }: { categories: Categories }) {

  useHydrateAtoms([[categoriesAtom, categories] as const]);

  const [coordinates, setCoordinates] = useState<Coordinates>([126.976882, 37.574187]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position);
      setCoordinates([position.coords.longitude, position.coords.latitude]);
    });

    const categoriesCalling = async () => {
      try {
        if (categories.length == 0) {
          await findCategories();
        }
      } catch (err) {
        console.error(err);
      }
    };

    categoriesCalling();
  }, []);

  return (
    <div>
      <Chips categories={categories} />
      <Map loc={coordinates} />
      <Photos />
    </div>
  );
}