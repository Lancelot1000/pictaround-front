import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';

import useFetcher from '@/app/hooks/useFetcher';
import { myInformationAtom } from '@/atom/auth';
import { favoriteReviewsAtom, setFavoritesAtom } from '@/atom/common';
import { activeReviewAtom } from '@/atom/search';


export default function Component() {
  const [ringing, setRinging] = useState(false);

  const activeReview: Review = useAtomValue(activeReviewAtom);
  const myInfo = useAtomValue(myInformationAtom);

  const setFavorite = useSetAtom(setFavoritesAtom);
  const favoriteReviewIds: number[] = useAtomValue(favoriteReviewsAtom);


  const onFavoriteClick = async (id: number) => {
    try {
      if (Object.keys(myInfo).length === 0) {
        setRinging(true);

        setTimeout(() => {
          setRinging(false);
        }, 1000);
        return;
      }
      await setFavorite({ id });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
    }
  };


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { invokeFetch: favoriteClickHandler } = useFetcher({ apiCall: onFavoriteClick });

  return (
    <div className={'px-4 mt-4 flex items-center gap-2'}>
      <div
        className={`${ringing ? 'ringing' : ''}`}
        onClick={() => favoriteClickHandler(activeReview.id)}
      >
        {favoriteReviewIds.includes(activeReview?.id || 0) ? (
          <FaHeart color={'#FF3232'} size={20} />
        ) : (
          <FaRegHeart color={'gray'} size={20} />
        )
        }
      </div>
      {ringing ? (
        <p className={'text-blue-700'}>
          로그인이 필요합니다.
        </p>
      ) : (
        <p>{activeReview?.likeCount || 0}</p>
      )}
    </div>
  );
}