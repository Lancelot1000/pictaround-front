'use client';

import { useAtomValue } from 'jotai';
import { Fragment } from 'react';

import {
  isLoadingAtom,
  locationsAtom,
} from '@/atom/search';
import Pagination from '@/components/Pagination';

import Photo from './Photo';
import SkeletonPhoto from './SkeletonPhoto';

export default function Component({ popupOpenAction }: { popupOpenAction: () => void }) {

  const isLoading = useAtomValue(isLoadingAtom);
  const locations: LocationList = useAtomValue(locationsAtom);

  return (
    <div>
      {
        isLoading ? (
          <div className={'flex flex-wrap my-4'}>
            {Array.from({ length: 20 }).map((_, index) => (<SkeletonPhoto key={index} />))}
          </div>
        ) : locations.total === 0
          ? (
            <div className={'my-[40px]'}>검색 결과가 없습니다.</div>
          ) : (
            <Fragment>
              <div className={'flex flex-wrap my-4'}>
                {locations.items.map((location: LocationInfo) => {
                  return (
                    <Photo key={location.id} data={location} open={popupOpenAction} />
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