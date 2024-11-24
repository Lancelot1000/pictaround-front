import { useAtomValue } from 'jotai';
import { useSetAtom } from 'jotai/index';
import { useState } from 'react';

import { isPopupOpenAtom } from '@/atom/common';
import { findLocationAtom, findReviewsAtom } from '@/atom/search';
import CommonImage from '@/components/CommonImage';


export default function Component({ data, open }: { data: LocationInfo, open: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const isPopupOpen = useAtomValue(isPopupOpenAtom);
  const findReviews = useSetAtom(findReviewsAtom);
  const findLocation = useSetAtom(findLocationAtom);

  const onPhotoClick = async () => {
    try {
      setIsLoading(true);

      const [_, res] = await Promise.all([
        findLocation({ id: data.id }),
        findReviews({ id: data.id }),
      ]);

      if (res) {
        open();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ height: 'calc(100vw / 4)', maxHeight: '150px', zIndex: isPopupOpen ? -1 : 1 }}
      className={'w-[25%] border-2 border-gray-200 cursor-pointer'}
    >
      <CommonImage
        width={'100%'}
        height={'100%'}
        alt={data.name}
        cursor={'pointer'}
        isLoading={isLoading}
        onClick={onPhotoClick}
        imageLocation={data.imageLocation}
      />
    </div>
  );
}