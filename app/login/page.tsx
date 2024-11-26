'use client';

import { useSetAtom } from 'jotai/index';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useFetcher from '@/app/hooks/useFetcher';
import { loginAtom } from '@/atom/auth';
import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';
import { errorMessage } from '@/utils/errorMessage';

type Login = {
  id: string,
  password: string,
}

type Error = 'invalid' | 'unexpected' | 'none';

export default function Page() {
  const router = useRouter();
  const form = useForm();
  const searchParams = useSearchParams();


  const login = useSetAtom(loginAtom);

  const [errorType, setErrorType] = useState<Error>('none');

  const loginHandler = async (data: Login) => {
    try {
      const res: { success: boolean } = await login(data);

      if (res.success) {
        router.push('/');
      }
    } catch (err) {
      if (err instanceof Error && err.message === 'invalid username or password') {
        setErrorType('invalid');
      } else {
        setErrorType('unexpected');
      }
      throw err;
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { isLoading, invokeFetch } = useFetcher<Login>({ apiCall: loginHandler, unlockLoading: true });

  const isLoginButtonActive = !!form.watch('id') && !!form.watch('password');

  const fromJoin = searchParams.get('redirect_uri') === '/join';

  return (
    <Form form={form} onSubmit={invokeFetch}>
      <div className={'py-10 px-4 flex flex-col gap-4 border mt-[100px]'}>
        <h2 className={'text-2xl font-medium text-center'}>로그인</h2>
        {errorType === 'none' && fromJoin && (
          <div className={'h-[80px] flex flex-col items-center justify-center info-box'}>
            <p className={'info-text'}>회원가입을 축하합니다. 로그인을 진행해주세요.</p>
          </div>
        )}
        <Input id={'id'} label={'아이디'} />
        <Input id={'password'} label={'비밀번호'} type={'password'} />
        {errorType !== 'none' && (
          <div
            className={'h-[80px] flex flex-col items-center justify-center error-box'}>
            {errorType === 'invalid'
              ? (
                <p className={'error-text'}>{errorMessage['invalid username or password']}</p>
              ) : (
                <p className={'error-text'}>{errorMessage['default']}</p>
              )}
            <p className={'error-text'}>다시 시도해주세요.</p>
          </div>
        )}
        <div className={'flex flex-col gap-4'}>
          <Button
            label={'로그인'}
            type={'submit'}
            size={'md-soft-round'}
            disabled={!isLoginButtonActive}
            style={{ backgroundColor: 'royalblue' }}
            loading={isLoading}
          />
          <Button
            label={'회원가입'}
            size={'md-soft-round'}
            style={{ backgroundColor: 'dimgray' }}
            onClick={() => {
              router.push('/join');
            }}
          />
        </div>
      </div>
    </Form>
  );
}