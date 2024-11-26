'use client';

import { useSetAtom } from 'jotai/index';
import React, { useEffect } from 'react';

import useModal from '@/app/hooks/useModal';
import useSideBar from '@/app/hooks/useSideBar';
import { findMeAtom } from '@/atom/auth';
import { findCategoriesAtom, findFavoritesAtom } from '@/atom/common';

export default function Component() {

  const { open, SideBarComponent } = useSideBar();
  const { open: openModal, close, ModalComponent } = useModal();

  const findMe = useSetAtom(findMeAtom);
  const findFavorites = useSetAtom(findFavoritesAtom);
  const findCategories = useSetAtom(findCategoriesAtom);

  useEffect(() => {
    const init = async () => {
      try {
        // 카테고리
        await findCategories();

        // 유저 정보
        const cookieStore = document.cookie.split(';');
        const userSession = cookieStore.find(cookie => cookie.split('=')[0].trim() === 'USER_SESSION');
        if (!userSession) return;

        await Promise.all([
          findMe(),
          findFavorites(),
        ]);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        openModal();
      }
    };

    init();
  }, []);


  const MenuIcon: React.FC = () => {
    return (
      <div className="w-6 h-2/3  flex-col justify-evenly flex cursor-pointer"
           onClick={open}>
        <div className="border border-gray-600"></div>
        <div className="border border-gray-600"></div>
        <div className="border border-gray-600"></div>
      </div>
    );
  };

  return (
    <div className={'w-full'}>
      <header className="flex justify-between h-[40px] items-center px-3">
        <h1 className={'logo text-xl'}>PictARound</h1>
        <MenuIcon />
      </header>
      <SideBarComponent />
      <ModalComponent
        title={'알림'}
        content={'일시적인 오류입니다.\n다시 시도해주세요.'}
        buttons={[
          {
            size: 's',
            label: '확인',
            onClick: close,
            style: { backgroundColor: 'royalblue' },
          },
        ]}
      />
    </div>
  );
}
