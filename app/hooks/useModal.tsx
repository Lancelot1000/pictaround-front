import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ButtonProps } from '@/app/types/common';
import Button from '@/components/Button';

type ModalProps = {
  title?: string,
  content: string,
  buttons: ButtonProps []

}

export default function useModal() {
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


  const ModalComponent = ({ title, content, buttons }: ModalProps) => {

    if (!isOpen) {
      return null;
    }

    return (
      createPortal(
        <div
          className={'fixed w-full h-full flex items-center justify-center bg-[#00000040] animate-lightFadeIn z-10 border-g'}>
          <div
            style={{ boxShadow: '0px 0px 5px #00000050' }}
            className={'fixed w-[100vw] max-w-[350px] py-4 horizon_center z-20 border bg-white rounded-xl px-4 pt-4 pb-6'}
          >
            {title && (
              <div className={'py-2'}>
                <p className={'text-xl font-semibold'}>{title}</p>
              </div>
            )}
            <div className={'py-4 mb-4'}>
              <p className={'text-lg font-medium whitespace-pre-wrap'}>{content}</p>
            </div>
            <div className={'flex gap-2'}>
              {buttons.map(button => {
                return (
                  <Button
                    key={button.label}
                    size={button.size}
                    label={button.label}
                    style={{ ...button.style, flex: 1 }}
                    onClick={button.onClick}
                  />
                );
              })}
            </div>
          </div>
        </div>,
        document.getElementById('modal') as HTMLElement,
      )
    );
  };


  return { open, close, ModalComponent, isOpen };
}