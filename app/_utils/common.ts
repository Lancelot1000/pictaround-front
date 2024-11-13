export const createQueryString = (queries: Record<string, any>): string => {
  let queryString = '';

  if (Object.entries(queries).length == 0) return queryString;

  queryString += `?`;

  for (const [key, value] of Object.entries(queries)) {
    queryString += `${key}=${encodeURIComponent(value)}&`;

  }

  return queryString.slice(0, -1);
};