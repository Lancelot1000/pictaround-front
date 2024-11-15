import Link from 'next/link';
import { CSSProperties } from 'react';

type Props = {
  size: 'sm' | 'm' | 'm-soft-round' | 'md';
  label: string;
  route?: string;
  onClick?: () => void;
  style?: CSSProperties;
  type?: 'submit' | 'button';
  disabled?: boolean;
}

export default function Component(
  {
    label,
    style,
    size,
    route,
    onClick = () => {
    },
    type = 'button',
    disabled = false,
  }: Props) {


  const getSizeStyle = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          padding: '4px 8px',
          borderRadius: '20px',
        };
      case 'm-soft-round':
        return {
          padding: '8px 16px',
          borderRadius: '4px',
        };
      case 'm':
        return {
          padding: '8px 16px',
          borderRadius: '40px',
        };
      case 'md':
        return {
          padding: '12px 20px',
          borderRadius: '40px',
        };
      default:
        return {};
    }
  };


  if (route) {
    return (
      <Link href={route} className={'cursor-pointer'} style={{ ...getSizeStyle(size), ...style }}>
        <span className={'text-white font-medium'}>{label}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      className={'cursor-pointer'}
      style={{ ...getSizeStyle(size), opacity: disabled ? 0.5 : 1, ...style }}
    >
      <span className={'text-white font-medium'}>{label}</span>
    </button>
  );
};