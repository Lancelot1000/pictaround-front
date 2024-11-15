import { atom } from 'jotai';

import { isPopupOpenAtom } from '@/atom/common';

import { findLocations, findReviews } from './fetch';

export const boundsAtom = atom({ _min: {}, _max: {} });
export const locationsAtom = atom({ offset: 0, limit: 0, total: 0, items: [] });
export const reviewsAtom = atom([]);
export const activeReviewAtom = atom({ item: { }, index: 0 });

export const isLoadingAtom = atom(false);

export const findLocationsAtom = atom(null, async (get, set, data) => {
  set(isLoadingAtom, true);
  const res = await findLocations({
    query: {
      minLng: data._min._lng,
      minLat: data._min._lat,
      maxLng: data._max._lng,
      maxLat: data._max._lat,
      offset: data.offset || 0,
      limit: data.limit || 20,
      category: data.category || '',
    },
  });

  set(locationsAtom, res);
  set(isLoadingAtom, false);
  set(isPopupOpenAtom, false);

  return res;
});

export const findReviewsAtom = atom(null, async (get, set, data) => {
  const res = await findReviews({ params: { id: data.id } });

  set(reviewsAtom, res.items);
  set(activeReviewAtom, { item: res.items[0], index: 0 });

  return true;


});

