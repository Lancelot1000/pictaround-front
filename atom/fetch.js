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

export async function findLocations({ query }) {
  const res = await fetcher('/search', 'GET', { query });

  return res;

}


export async function findReviews({ params }) {
  const res = await fetcher(`/search/${params.id}`, 'GET', {});

  return res;
}

export async function login({ body }) {
  const res = await fetcher(`/auth/login`, 'POST', { body });

  return res;
}

export async function findMe() {
  const res = await fetcher(`/user/me`, 'GET');

  return res;
}