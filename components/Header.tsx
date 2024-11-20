'use client';

import { useHydrateAtoms } from 'jotai/utils';
import React from 'react';

import useSideBar from '@/app/hooks/useSideBar';
import { myInformationAtom } from '@/atom/auth';

export default function Component({ myInformation }: { myInformation: User }) {

  const { open, SideBarComponent } = useSideBar();
  useHydrateAtoms([[myInformationAtom, myInformation]], { dangerouslyForceHydrate: true });

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
