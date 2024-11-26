import { FiX } from '@react-icons/all-files/fi/FiX';
import { useAtomValue, useSetAtom } from 'jotai';
import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { isPopupOpenAtom } from '@/atom/common';
import { activeReviewAtom, locationAtom } from '@/atom/search';
import CommonImage from '@/components/CommonImage';
import LikeCountComponent from '@/components/LikeCount';
import PopupPhotosComponent from '@/components/PopupPhotos';

export default function usePhotoPopup() {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setOpen] = useState(false);

  const setIsPopupOpen = useSetAtom(isPopupOpenAtom);

  const activeReview: Review = useAtomValue(activeReviewAtom);
  const location: SingleLocation = useAtomValue(locationAtom);

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

  const scrollTop = () => {
    if (modalRef?.current === null) return;

    console.log(modalRef.current);

    modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const LocationInfoComponent = () => {

    if (!isOpen) return null;

    return (
      createPortal(
        <div>
          <div
            onClick={close}
            className={'fixed w-[100vw] h-[100vh] overflow-hidden flex items-center justify-center z-10'}
          />
          <div
            style={{ height: 'calc(100vh-100px)' }}
            className={'fixed w-[100vw] max-w-[500px] py-4 horizon_center z-20'}
          >
            <div
              style={{ boxShadow: '0px 0px 1px #00000070' }}
              className={'py-2 rounded-xl bg-gray-50'}
            >
              <div
                className={'overflow-scroll h-[calc(100vh_-_50px)] non-scroll'}
              >
                <div
                  ref={modalRef}
                  className={'flex flex-col'}>
                  <div className={'flex justify-between items-center pb-3 px-3'}>
                    <div>
                      <p>{location.name}</p>
                      <p className={'text-sm'}>{location.address}</p>
                    </div>
                    <div onClick={close}>
                      <FiX size={24} color={'black'} />
                    </div>
                  </div>
                  <CommonImage
                    width={'100%'}
                    height={'300px'}
                    objectFit={'contain'}
                    alt={`${location.name} image`}
                    imageLocation={activeReview?.imageLocation || ''}
                  />
                  <LikeCountComponent />
                  <div className={'p-4'}>
                    {activeReview?.comment || ''}
                  </div>
                </div>
                <PopupPhotosComponent scrollTop={scrollTop} />
              </div>
            </div>
          </div>
        </div>,
        document.getElementById('portal') as HTMLElement,
      )
    );
  };


  return { open, close, LocationInfoComponent: memo(LocationInfoComponent) };
}