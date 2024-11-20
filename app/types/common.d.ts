import { CSSProperties } from 'react';

type Category = { id: string, label: string, value: string };
type Categories = Category[];


interface List {
  limit: number | null;
  offset: number | null;
  total: number | null;
}

type ButtonProps = {
  size: 's' | 'sm' | 'm' | 'm-soft-round' | 'md' | 'md-soft-round' | '';
  label: string;
  route?: string;
  onClick?: () => void;
  style?: CSSProperties;
  type?: 'submit' | 'button';
  disabled?: boolean;
  loading?: boolean;
}