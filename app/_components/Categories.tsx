
import { useAtomValue, useSetAtom } from 'jotai/index';
import { useEffect } from 'react';

import { categoriesAtom, findCategoriesAtom } from '@/atom/common';

import Category from './Category';

export default function Component() {

  const categories = useAtomValue(categoriesAtom);
  const findCategories = useSetAtom(findCategoriesAtom);

  const categoriesCalling = async () => {
    try {
      // 셋팅된 것이 없다면
      if (categories.length < 2) {
        await findCategories();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    categoriesCalling();
  }, []);

  return (
    <div className={'flex gap-2 my-2 px-4 overflow-x-scroll non-scroll'}>
      {categories.map(category => {
        return (
          <Category key={category.id} data={category} />
        );
      })}
    </div>
  );
}