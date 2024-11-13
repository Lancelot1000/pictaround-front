import fetcher from '../utils/fetcher';

export async function findCategories() {
  const res = await fetcher('/common/categories', 'GET', {});

  return res;
}