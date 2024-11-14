import fetcher from '../utils/fetcher';

export async function findCategories() {
  if (typeof window !== 'undefined') {
    const itemStr = localStorage.getItem('categories');

    if (!!itemStr) {
      const item = JSON.parse(itemStr);

      if (item.expires > new Date().getTime()) {
        return item.value;
      }
    }
  }

  const res = await fetcher('/common/categories', 'GET', {});

  if (typeof window !== 'undefined') {
    localStorage.setItem('categories', JSON.stringify({
      value: res,
      expires: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    }));
  }

  return res;
}