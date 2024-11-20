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

export async function findMe() {
  try {
    const res = await fetcher(`/user/me`, 'GET');

    return res;
  } catch (err) {
    throw err;
  }
}

// AUTH
export async function login({ body }) {
  try {
    const res = await fetcher(`/auth/login`, 'POST', { body });

    return res;

  } catch (err) {
    throw err;
  }
}

export async function join({ body }) {
  try {
    const res = await fetcher(`/auth/join`, 'POST', { body });

    return res;

  } catch (err) {
    throw err;
  }
}

export async function checkIdDuplicated({ params }) {
  try {
    const res = await fetcher(`/auth/check-id/${params.username}`, 'GET', {});

    return res;

  } catch (err) {
    throw err;
  }
}