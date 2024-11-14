import { atom } from 'jotai';

import { findLocations } from './fetch';

export const locationsAtom = atom([]);

export const findLocationsAtom = atom(null, async (get, set, data) => {
  const res = await findLocations({
    query: {
      minLng: data._min._lng,
      minLat: data._min._lat,
      maxLng: data._max._lng,
      maxLat: data._max._lat,
      offset: data.offset || 0,
      limit: data.limit || 20,
    },
  });

  set(locationsAtom, res);

  return res;
});


