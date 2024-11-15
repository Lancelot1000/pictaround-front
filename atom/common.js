import { atom } from 'jotai';

import { findCategories } from '@/atom/fetch';

export const isPopupOpenAtom = atom(false);

export const categoriesAtom = atom(
  [
    {
      id: '0',
      label: '전체',
      value: 'all',
    },
  ]);

export const findCategoriesAtom = atom(null, async (get, set) => {
  const response = await findCategories();

  set(categoriesAtom, response);
});
