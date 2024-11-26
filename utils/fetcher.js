const log = (...messages) => {
  if (process.env.NODE_ENV !== 'production') {
    messages.forEach(message => console.log(message));
  }
};

const fetcher = async (urlPath, method, options = {}) => {
  try {
    log(`===============================`);
    const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
    let URL = urlPath.startsWith('http') ? urlPath : BASE_URL + urlPath;
    log(`(${method}) url: ${URL}`);
    const obj = {
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        // 'X-Auth-Token': TOKEN,
        'Content-Type': 'application/json',
      },
    };

    // header - auth
    if (options.token) {
      obj.headers['Authorization'] = options.token;
    }

    // contentType
    if (options.type) {
      obj.headers['Content-Type'] = options.type;

    }

    // query
    if (options.query) {
      log('query: ', options.query);

      let q = '';
      Object.entries(options.query).forEach(([k, v], i) => {
        q += i === 0 ? '?' : '&';
        q += `${k}=${v}`;
      });

      URL += q;
    }

    // body
    if (options.body) {
      log('body: ', options.body);
      obj.body = JSON.stringify(options.body);
    }

    const response = await fetch(URL, {
      method,
      ...obj,
    });

    const res = await response.json();

    if (response.ok === false) {
      log('res', res);

      if (typeof document !== 'undefined') {
        throw new Error(res?.message);
      }
    }

    log('res: ', res);
    log(`===============================`);
    return res;
  } catch (err) {
    throw err;
  }
};

export default fetcher;
