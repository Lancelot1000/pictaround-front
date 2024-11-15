import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { isPopupOpenAtom } from '@/atom/common';
import { activeReviewAtom, reviewsAtom } from '@/atom/search';

export default function usePhotoPopup() {
  const [isOpen, setOpen] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const setIsPopupOpen = useSetAtom(isPopupOpenAtom);

  const reviews: Review[] = useAtomValue(reviewsAtom);
  const activeReview: Awaited<{ item: Review, index: number }> = useAtomValue(activeReviewAtom);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const open = () => {
    setOpen(true);
    setIsPopupOpen(true);
  };

  const close = () => {
    setOpen(false);
    setIsPopupOpen(false);
  };


  const LocationInfoComponent = () => {

    if (!isOpen) {
      return null;
    }

    const isPrevButtonActive = activeReviewIndex !== 0;
    const isNextButtonActive = reviews.length - 1 > activeReviewIndex;

    const prevButtonColor = isPrevButtonActive ? 'black' : 'gray';
    const nextButtonColor = isNextButtonActive ? 'black' : 'gray';


    const onClickEvent = (n: 1 | -1) => {
      if (n === -1 && !isPrevButtonActive) return;
      if (n === 1 && !isNextButtonActive) return;

      setActiveReviewIndex(prev => prev + n);
    };


    return (
      createPortal(
        <div>
          <div
            onClick={close}
            className={'fixed w-[100vw] h-[100vh] overflow-hidden flex items-center justify-center z-10'}
          />
          <div className={'fixed w-[100vw] max-w-[500px] h-[100%] py-4 horizon_center z-20'}>
            <div className={'max-h-[100%] bg-gray-50 overflow-hidden rounded-xl'}>
              <div className={'flex flex-col h-[100%]'}>
                <div className={'flex justify-between items-center p-2 relative'}>
                  <p>{activeReview.item?.name}</p>
                  <div onClick={close}>
                    <FiX size={24} color={'black'} />
                  </div>
                </div>
                <div className={'overflow-scroll non-scroll'} style={{ flex: 1 }}>
                  <div className={'relative w-full h-[300px]'}>
                    <Image
                      fill
                      objectFit={'contain'}
                      src={activeReview.item?.location || ''}
                      alt={`${activeReview.item?.name} + image`}
                    />
                    <div className={'vertical_center absolute w-full'}>
                      <div className={'flex justify-between px-4'}>
                        <div
                          onClick={() => onClickEvent(-1)}
                          style={{ border: `1px solid ${prevButtonColor}` }}
                          className={'flex justify-center items-center rounded-full w-[30px] h-[30px] cursor-pointer'}
                        >
                          <FiChevronLeft size={24} color={prevButtonColor} />
                        </div>
                        <div
                          onClick={() => onClickEvent(+1)}
                          style={{ border: `1px solid ${nextButtonColor}` }}
                          className={'flex justify-center items-center rounded-full w-[30px] h-[30px] cursor-pointer'}
                        >
                          <FiChevronRight size={24} color={nextButtonColor} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={'p-4 m-4'}>
                    {activeReview.item?.comment}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById('portal') as HTMLElement,
      )
    );
  };


  return { open, close, LocationInfoComponent, isOpen };
}