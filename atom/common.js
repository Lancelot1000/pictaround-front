import { atom } from 'jotai';

import * as Fetch from '@/atom/fetch';
import { activeReviewAtom } from '@/atom/search';

export const isPopupOpenAtom = atom(false);

export const favoriteReviewsAtom = atom([]);
export const categoriesAtom = atom(
  [
    {
      id: '0',
      label: '전체',
      value: 'all',
    },
  ]);


export const findCategoriesAtom = atom(null, async (get, set) => {
  const response = await Fetch.findCategories();

  set(categoriesAtom, response);
});

export const findFavoritesAtom = atom(null, async (get, set) => {
  const response = await Fetch.findFavorites();

  set(favoriteReviewsAtom, response.favoriteReviewIds);
});

export const setFavoritesAtom = atom(null, async (get, set, data) => {
  try {
    await Fetch.setFavorite({ params: { id: data.id } });

    const favorites = get(favoriteReviewsAtom);
    const activeReview = get(activeReviewAtom);

    if (favorites.includes(data.id)) {
      set(favoriteReviewsAtom, favorites.filter(e => e !== data.id));
      activeReview.likeCount -= 1;
    } else {
      set(favoriteReviewsAtom, [...favorites, data.id]);
      activeReview.likeCount += 1;
    }
  } catch (err) {
    throw err;
  }
});
