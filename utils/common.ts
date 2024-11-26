import { ReadonlyURLSearchParams } from 'next/navigation';

export const createQueryString = (searchParams: ReadonlyURLSearchParams, queries: Record<string, any>): string => {
  const params: Record<string, string> = {};

  searchParams.toString().split('&').forEach(e => {
    const [key, value] = e.split('=');
    params[key] = value;
  });

  for (const [key, value] of Object.entries(queries)) {
    if (!key) continue;

    if (!value) {
      delete params[key];
      continue;
    }

    params[key] = value;
  }

  let queryString = '';

  queryString += `?`;

  for (const [key, value] of Object.entries(params)) {
    if (!key) continue;
    queryString += `${key}=${encodeURIComponent(value)}&`;

  }

  return queryString.slice(0, -1);
};