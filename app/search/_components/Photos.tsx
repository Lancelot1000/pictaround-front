'use client';

import { useAtomValue } from 'jotai';
import { Fragment } from 'react';

import {
  isLoadingAtom,
  locationsAtom,
} from '@/atom/search';

import Photo from './Photo';
import SkeletonPhoto from './SkeletonPhoto';
import Pagination from '@/components/Pagination';

export default function Component() {
  const isLoading = useAtomValue(isLoadingAtom);
  const locations: LocationList = useAtomValue(locationsAtom);

  return (
    <div>
      {
        locations.total === 0 ? (
          <div className={'my-[40px]'}>검색 결과가 없습니다.</div>
        ) : isLoading ? (

          new Array(20).map((_, i) => {
            return <SkeletonPhoto key={i} />;
          })
          ) : (
          <Fragment>
            <div className={'flex flex-wrap my-4'}>
              {locations.items.map((location: LocationInfo) => {
                return (
                  <Photo key={location.id} data={location} />

                );
              })}
            </div>
            <Pagination offset={locations.offset} limit={locations.limit} total={locations.total} />
          </Fragment>
        )
      }
    </div>
  )
    ;
}