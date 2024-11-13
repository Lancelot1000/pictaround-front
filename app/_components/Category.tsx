import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createQueryString } from '@/utils/common';

export default function Component({ data }: { data: Category }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category');

  // TODO: lat, lng
  const categoryRouter = (category: string) => {
    router.replace(`${pathname}${createQueryString({ lat: '', lng: '', category: category })}`);
  };

  return (
    <div
      className={`border cursor-pointer px-4 rounded-xl ${activeCategory == data.value ? 'border-amber-200 bg-amber-100' : 'border-gray-200'}`}
      style={{ flex: '0 0 auto' }}
      onClick={() => {
        categoryRouter(data.value);
      }}
    >
      <p className={'text-base'}>{data.label}</p>
    </div>
  );
}