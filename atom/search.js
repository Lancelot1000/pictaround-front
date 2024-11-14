import { atom } from 'jotai';

import { findLocations } from './fetch';

export const boundsAtom = atom({_min: {}, _max: {}});
export const locationsAtom = atom({ offset: 0, limit: 0, total: 0, items: [] });

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

  return res;
});


