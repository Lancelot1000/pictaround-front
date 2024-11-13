'use client';

import { categoriesAtom } from '@/atom/common';
import { findCategories } from '@/atom/fetch';
import { useAtomValue } from 'jotai';
import { Suspense, useEffect, useState } from 'react';

import Chips from '@/app/_components/Categories';
import Map from '@/app/_components/Map';
import Photos from './_components/Photos';

export default function Page() {

  const [coordinates, setCoordinates] = useState<Coordinates>([126.976882, 37.574187]);
  const categories = useAtomValue(categoriesAtom);

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
    }

    categoriesCalling();
  }, []);

  // TODO: API로 변경
  // const categories: Categories = [
  //   {
  //     id: Math.random().toString(),
  //     label: '전체',
  //     value: 'all',
  //   },
  //   {
  //     id: Math.random().toString(),
  //     label: '식사',
  //     value: 'food',
  //   },
  //   {
  //     id: Math.random().toString(),
  //     label: '베이커리',
  //     value: 'bakery',
  //   },
  //   {
  //     id: Math.random().toString(),
  //     label: '나들이',
  //     value: 'outing',
  //   },
  //   {
  //     id: Math.random().toString(),
  //     label: '체험',
  //     value: 'experience',
  //   },
  //   {
  //     id: Math.random().toString(),
  //     label: '전시',
  //     value: 'exhibition',
  //   },
  //   {
  //     id: Math.random().toString(),
  //     label: 'etc',
  //     value: '기타',
  //   },
  // ];

  return (
    <div>
      <Suspense fallback={<div>fallback</div>}>
        <Chips categories={categories} />
      </Suspense>
      <Map loc={coordinates} />
      <Photos />
    </div>
  );
}