import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { IoMdPhotos } from '@react-icons/all-files/io/IoMdPhotos';
import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { Fragment, memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useFetcher from '@/app/hooks/useFetcher';
import { favoriteReviewsAtom, isPopupOpenAtom, setFavoritesAtom } from '@/atom/common';
import { activeReviewAtom, findMoreReviewsAtom, locationAtom, reviewsAtom, setActiveReviewAtom } from '@/atom/search';

export default function usePhotoPopup() {
  const [isOpen, setOpen] = useState(false);

  console.log("USE PHOTO POPUP");

  const setFavorite = useSetAtom(setFavoritesAtom);
  const setIsPopupOpen = useSetAtom(isPopupOpenAtom);
  const setActiveReview = useSetAtom(setActiveReviewAtom);
  const findMoreReviews = useSetAtom(findMoreReviewsAtom);

  const reviews: ReviewList = useAtomValue(reviewsAtom);
  const activeReview: Review = useAtomValue(activeReviewAtom);
  const location: SingleLocation = useAtomValue(locationAtom);
  const favoriteReviewIds: number[] = useAtomValue(favoriteReviewsAtom);

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


  const findMoreReviewsHandler = async () => {
    try {
      await findMoreReviews({ id: location.id, offset: reviews.offset + reviews.limit });
    } catch (err) {
      console.log(err);
    }
  };

  const onFavoriteClick = async (id: number) => {
    try {
      await setFavorite({ id });
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading, invokeFetch } = useFetcher({ apiCall: findMoreReviewsHandler });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { invokeFetch: favoriteClickHandler } = useFetcher({ apiCall: onFavoriteClick });


  const LocationInfoComponent = () => {

    if (!isOpen) {
      return null;
    }

    return (
      createPortal(
        <div>
          <div
            onClick={close}
            className={'fixed w-[100vw] h-[100vh] overflow-hidden flex items-center justify-center z-10'}
          />
          <div className={'fixed w-[100vw] max-w-[500px] h-[100%] py-4 horizon_center z-20'}>
            <div
              style={{ boxShadow: '0px 0px 1px #00000070' }}
              className={'max-h-[100%] bg-gray-50 rounded-xl overflow-scroll non-scroll'}
            >
              <div className={'flex flex-col h-[100%]'}>
                <div className={'flex justify-between items-center p-3 relative'}>
                  <div>
                    <p>{location.name}</p>
                    <p className={'text-sm'}>{location.address}</p>
                  </div>
                  <div onClick={close}>
                    <FiX size={24} color={'black'} />
                  </div>
                </div>
                <div className={'overflow-scroll non-scroll'} style={{ flex: 1 }}>
                  <div className={'relative w-full h-[300px]'}>
                    <Image
                      fill
                      objectFit={'contain'}
                      alt={`${location.name} image`}
                      src={activeReview?.imageLocation || ''}
                    />
                  </div>
                  <div className={'px-4 mt-4 flex gap-2'}>
                    <div onClick={() => favoriteClickHandler(activeReview.id)}>
                      {favoriteReviewIds.includes(activeReview?.id || 0) ? (
                        <FaHeart color={'#FF3232'} size={20} />
                      ) : (
                        <FaRegHeart color={'gray'} size={20} />
                      )
                      }
                    </div>
                    <p>
                      {activeReview?.likeCount || 0}
                    </p>
                  </div>
                  <div className={'p-4'}>
                    {activeReview?.comment || ''}
                  </div>
                </div>
              </div>
              {/* 이미지들 */}
              <div className={'flex flex-wrap gap-2 p-4'}>
                {reviews.items.map((review: Review) => {
                  return (
                    <div
                      key={review.id}
                      onClick={() => setActiveReview(review)}
                      className={'relative w-[25%] h-[120px] cursor-pointer'}
                    >
                      {review.imageLocation &&
                        <Image
                          fill
                          objectFit={'cover'}
                          src={review.imageLocation}
                          alt={`${location.name} image ${review.id}th`}
                        />
                      }
                    </div>
                  );
                })}
                {(reviews.total > (reviews.offset + reviews.limit)) && (
                  <div
                    onClick={() => invokeFetch()}
                    className={'w-[120px] h-[120px] flex-col cursor-pointer border flex items-center justify-center'}
                  >
                    {isLoading ? (
                      <svg aria-hidden="true" role="status"
                           className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                           viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor" />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#1C64F2" />
                      </svg>
                    ) : (
                      <Fragment>
                        <IoMdPhotos className={'text-gray-900'} size={36} />
                        <p>더 보기</p>
                      </Fragment>
                    )}
                  </div>
                )
                }
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