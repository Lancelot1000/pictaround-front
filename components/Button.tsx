import { CSSProperties } from 'react';
import Link from 'next/link';

type Props = {
  size: string;
  label: string;
  route: string;
  style?: CSSProperties;
}

export default function Component({ label, style, size, route }: Props) {

  const getSizeStyle = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          padding: '4px 8px',
          borderRadius: '20px',
        }
      case 'm':
        return {
          padding: '8px 16px',
          borderRadius: '40px',
        }
      case 'md':
        return {
          padding: '12px 20px',
          borderRadius: '40px',
        };
      default:
        return {}
    }
  };


  return (
    <Link href={route} className={'cursor-pointer'} style={{ ...getSizeStyle(size), ...style }}>
      <span className={'text-white font-medium'}>{label}</span>
    </Link>
  );
}