import { cookies } from 'next/headers';
import { Fragment, ReactNode } from 'react';

import { findMe } from '@/atom/fetch';
import HeaderComponent from '@/components/Header';

export default async function Provider({ children }: { children: ReactNode }) {
  let myInformation: User = {};

  try {
    const cookieStore = await cookies();

    const userSession = cookieStore.get('USER_SESSION');
    if (typeof userSession !== 'undefined') {
      try {
        myInformation = await findMe({ options: { cookie: { 'USER_SESSION': userSession['value'] } } });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <Fragment>
      <HeaderComponent myInformation={myInformation} />
      {children}
    </Fragment>
  );
}