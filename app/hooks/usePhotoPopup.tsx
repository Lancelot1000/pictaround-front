import { FiX } from '@react-icons/all-files/fi/FiX';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Avatar from '@/app/_components/Avatar';

export default function usePhotoPopup() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };

  }, [isOpen]);

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };


  const SideBarComponent = () => {

    if (!isOpen) {
      return null;
    }

    // TODO: route 수정
    const menus = [
      { type: 'menu', label: '지도 확인', route: '/search' },
      { type: 'divider', label: 'divider1', route: '/' },
      { type: 'menu', label: '장소 등록', route: '/register' },
      { type: 'menu', label: '나의 보관함', route: '/favorite' },
      { type: 'divider', label: 'divider2', route: '/' },
      { type: 'menu', label: '문의', route: '/faq' },
    ];

    return (
      createPortal(
        <div style={{ zIndex: 999999 }}>
          <div className={'absolute w-full h-full bg-[#00000070] animate-fadeIn overflow-hidden'} onClick={close}>
            <nav className={'absolute top-0 right-0 w-[200px] h-full bg-white animate-slideIn p-2 overflow-y-auto'}>
              <div onClick={close} className="flex justify-end">
                <FiX size={24} onClick={close} color={'#000'} className="cursor-pointer" />
              </div>
              <div className="py-4 my-4 flex justify-between items-center">
                <Avatar location={''} />
                {/*TODO: 로그인 구현*/}
                <Link href={'/public'}>
                  <span className="text-xl font-mediums">
                    로그인
                  </span>
                </Link>
              </div>
              {menus.map(menu => {
                if (menu.type == 'divider') {
                  return (
                    <div key={menu.label} className="bg-black w-full h-[1px] my-1"></div>
                  );
                }

                if (menu.type == 'menu') {
                  return (
                    <Link key={menu.label} href={menu.route}>
                      <div className="cursor-pointer p-2">{menu.label}</div>
                    </Link>
                  );
                }

                return null;
              })}
            </nav>
          </div>
        </div>,
        document.getElementById('side-bar') as HTMLElement,
      )
    );
  };


  return { open, close, SideBarComponent };
}