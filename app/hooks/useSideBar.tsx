import { FiX } from '@react-icons/all-files/fi/FiX';
import { useAtomValue, useSetAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { logoutAtom, myInformationAtom } from '@/atom/auth';
import { isPopupOpenAtom } from '@/atom/common';
import Avatar from '@/components/Avatar';

export default function useSideBar() {
  const [isOpen, setOpen] = useState(false);

  const myInformation = useAtomValue<User>(myInformationAtom);

  const logout = useSetAtom(logoutAtom);
  const setIsPopupOpen = useSetAtom(isPopupOpenAtom);

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

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };


  const SideBarComponent = () => {

    if (!isOpen) {
      return null;
    }

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
        <div>
          <div className={'absolute w-full h-full bg-[#00000070] animate-fadeIn overflow-hidden'}
               style={{ zIndex: 9999 }} onClick={close}>
            <nav
              className={'absolute top-0 right-0 w-[200px] h-full bg-white animate-slideIn p-2 overflow-y-auto border-l'}>
              <div onClick={close} className="flex justify-end">
                <FiX size={24} onClick={close} color={'#000'} className="cursor-pointer" />
              </div>
              <div className="pt-4 mt-4 flex justify-between items-center">
                <Avatar location={''} />
                {!!myInformation?.nickname ? (
                  <span className="text-xl font-medium">{myInformation.nickname}</span>
                ) : (
                  <Link href={'/login'}>
                    <span className="text-xl font-medium">로그인</span>
                  </Link>
                )}
              </div>
              <div className={'flex justify-end mb-4'}>
                {!!myInformation?.nickname &&
                  <span
                    onClick={logoutHandler}
                    className={'text-end text-sm underline mt-2 cursor-pointer'}
                  >
                    로그아웃
                  </span>
                }
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
        document.getElementById('portal') as HTMLElement,
      )
    );
  };


  return { open, close, SideBarComponent, isOpen };
}