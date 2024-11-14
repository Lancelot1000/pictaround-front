import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { createQueryString } from '@/utils/common';

export default function Component({ offset, limit, total }: { offset: number, limit: number, total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isPrevButtonActive = offset !== 0;
  const isNextButtonActive = total > (offset + 1) * limit;

  const prevButtonColor = isPrevButtonActive ? 'black' : 'gray';
  const nextButtonColor = isNextButtonActive ? 'black' : 'gray';

  const getPagination = (isActive: boolean, offset: number) => {
    if (!isActive) return;

    router.replace(`${pathname}${createQueryString(searchParams, { offset, limit })}`, { scroll: false });

  };

  return (
    <div className="flex justify-center items-center gap-4 p-4">
      <div
        onClick={() => getPagination(isPrevButtonActive, offset - limit)}
        style={{ border: `1px solid ${prevButtonColor}` }}
        className={'flex justify-center items-center rounded-full w-[30px] h-[30px] cursor-pointer'}
      >
        <FiChevronLeft size={24} color={prevButtonColor} />
      </div>
      <div
        style={{ border: `1px solid ${nextButtonColor}` }}
        onClick={() => getPagination(isNextButtonActive, offset + limit)}
        className={'flex justify-center items-center rounded-full w-[30px] h-[30px] cursor-pointer'}>
        <FiChevronRight size={24} color={nextButtonColor} />
      </div>
    </div>
  );
}