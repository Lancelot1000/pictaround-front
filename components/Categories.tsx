import { useAtomValue } from 'jotai/index';

import { categoriesAtom } from '@/atom/common';

import Category from './Category';

export default function Component() {

  const categories = useAtomValue(categoriesAtom);

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