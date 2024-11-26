export const dynamic = 'force-dynamic';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Fragment, ReactNode, Suspense } from 'react';

export default async function LoginLayout({ children }: { children: ReactNode }) {
  let userSession: RequestCookie | undefined;

  try {
    const cookieStore = await cookies();
    userSession = cookieStore.get('USER_SESSION');
  } catch (err) {
    console.error(err);
  }

  if (!!userSession) {
    redirect('/');
  }

  return (
    <Fragment>
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Fragment>
  );
}
