'use client';

import React from 'react';
import useSideBar from '@/hooks/useSideBar';

export default function Component() {

  const { open, SideBarComponent } = useSideBar();

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
    <div>
      <header className="flex justify-between h-[40px] items-center px-3">
        <h1 className={'logo text-xl'}>PictARound</h1>
        <MenuIcon />
      </header>
      <SideBarComponent />
    </div>
  );
}
