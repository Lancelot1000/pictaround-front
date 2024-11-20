'use client';

import { useSetAtom } from 'jotai/index';
import React, { useEffect } from 'react';

import useSideBar from '@/app/hooks/useSideBar';
import { findMeAtom } from '@/atom/auth';

export default function Component() {

  const { open, SideBarComponent } = useSideBar();

  const findMe = useSetAtom(findMeAtom);

  useEffect(() => {
    const init = async () => {
      try {
        const cookieStore = document.cookie.split(";");
        const userSession = cookieStore.find(cookie => cookie.split("=")[0].trim() === "USER_SESSION");
        if (!userSession) return;

        await findMe();

      } catch(err) {
        document.cookie = "USER_SESSION=; path=/; max-age=-1";
      }
    }

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
    </div>
  );
}
