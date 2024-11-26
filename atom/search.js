import { atom } from 'jotai';

import { isPopupOpenAtom } from '@/atom/common';

import { createReview, findLocation, findLocations, findReviewLikeCount, findReviews } from './fetch';
import * as Fetch from './fetch';

export const boundsAtom = atom({ _min: {}, _max: {} });
export const locationsAtom = atom({ offset: 0, limit: 0, total: 0, items: [] });
export const locationAtom = atom({});
export const reviewsAtom = atom({ offset: 0, limit: 0, total: 0, items: [] });
export const activeReviewAtom = atom({});
export const activeCategoryAtom = atom('');

export const isLoadingAtom = atom(true);

export const uploadImageAtom = atom(null, async (get, set, data) => {
  try {
    const res = await Fetch.getS3Url({
      body: {
        route: data.route,
        filename: data.filename,
        extension: data.extension,
      },
    });

    if (res.presignedUrl) {
      await Fetch.sendFile({ url: res.presignedUrl, file: data.file });
    }

    return res.location;

  } catch (err) {
    throw err;
  }
});

export const createReviewAtom = atom(null, async (get, set, data) => {
  try {
    const res = await createReview({ body: data });
    return res;
  } catch (err) {
    throw err;
  }
});

export const findLocationsAtom = atom(null, async (get, set, data) => {
  try {
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
    return res;
  } catch (err) {
    throw err;
  } finally {
    set(isLoadingAtom, false);
    set(isPopupOpenAtom, false);
  }

});

export const findLocationAtom = atom(null, async (get, set, data) => {
  const res = await findLocation({ params: { id: data.id } });

  set(locationAtom, res);

  return true;
});

export const findReviewsAtom = atom(null, async (get, set, data) => {
  const res = await findReviews({ params: { id: data.id } });

  set(reviewsAtom, res);
  set(activeReviewAtom, res.items[0]);

  return true;
});

export const findMoreReviewsAtom = atom(null, async (get, set, data) => {
  const res = await findReviews({ params: { id: data.id }, query: { offset: data.offset } });

  const prevReviews = get(reviewsAtom);
  set(reviewsAtom, {
    limit: res.limit,
    total: res.total,
    offset: res.offset,
    items: [...prevReviews.items, ...res.items],
  });

  return true;
});

export const setActiveReviewAtom = atom(null, async (get, set, review) => {
  try {
    const likeCount = await findReviewLikeCount({ params: { id: review.id } });

    if (likeCount !== review.likeCount) {
      review.likeCount = likeCount;
      set(activeReviewAtom, { ...review, likeCount });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    // NOTHING
  }
});