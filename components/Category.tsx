import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Category } from '@/app/types/common';
import { createQueryString } from '@/utils/common';

export default function Component({ data }: { data: Category }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category');

  const categoryRouter = (category: string) => {
    if (searchParams.get('category') == category) return;

    router.replace(`${pathname}${createQueryString(searchParams, { category: category })}`, { scroll: false });
  };

  return (
    <div
      className={
        `border cursor-pointer px-4 rounded-xl ${activeCategory == data.value ? 'border-amber-200 bg-amber-100' : 'border-gray-200'}`
      }
      style={{ flex: '0 0 auto' }}
      onClick={() => {
        categoryRouter(data.value);
      }}
    >
      <p className={'text-base'}>{data.label}</p>
    </div>
  );
}