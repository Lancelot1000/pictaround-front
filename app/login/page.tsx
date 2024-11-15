'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';

export default function Page() {
  const form = useForm();
  const router = useRouter();

  return (
    <Form form={form} onSubmit={(data: { id: string, password: string }) => {
      console.log('data', data);
    }}>
      <div className={'py-10 px-4 flex flex-col gap-4 border  mt-[100px]'}>
        <h2 className={'text-2xl font-medium text-center'}>회원가입</h2>
        <Input id={'id'} label={'아이디'} />
        <Input id={'password'} label={'비밀번호'} />
        <div className={'flex flex-col gap-4 my-4'}>
          <Button
            label={'로그인'}
            type={'submit'}
            size={'m-soft-round'}
            style={{ backgroundColor: 'royalblue' }}
          />
          <Button
            label={''}
            size={'m-soft-round'}
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