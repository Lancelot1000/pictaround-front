import { atom } from 'jotai';

import * as Fetch from './fetch';

export const myInformationAtom = atom({});

export const loginAtom = atom(null, async (get, set, data) => {
  try {
    const res = await Fetch.login({ body: data });

    if (res.success) {
      const userInfo = await Fetch.findMe();

      set(myInformationAtom, userInfo);
    }

    return res;
  } catch (err) {
    throw err;
  }
});

export const findMeAtom = atom(null, async (get, set) => {
  try {
    const res = await Fetch.findMe();

    set(myInformationAtom, res);
    return res;
  } catch (err) {
    throw err;
  }

});

export const joinAtom = atom(null, async (get, set, data) => {
  try {
    const res = await Fetch.join({ body: data });
    return res;

  } catch (err) {
    throw err;
  }
});

export const checkIdDuplicatedAtom = atom(null, async (get, set, data) => {
  try {
    const res = await Fetch.checkIdDuplicated({ params: { username: data.id } });
    return res;

  } catch (err) {
    throw err;
  }
});

export const logoutAtom = atom(null, async (get, set) => {
  try {
    const res = await Fetch.logout();

    set(myInformationAtom, {});
    return res;

  } catch (err) {
    throw err;
  }
});