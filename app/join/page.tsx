'use client';

import { useSetAtom } from 'jotai/index';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useFetcher from '@/app/hooks/useFetcher';
import useModal from '@/app/hooks/useModal';
import { checkIdDuplicatedAtom, joinAtom } from '@/atom/auth';
import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';

type DataProps = {
  id: string,
  password: string,
  'retry-password': string
}

const ID_REGEX = /^[a-zA-Z0-9_]{6,20}$/;


export default function Page() {
  const form = useForm();
  const { getValues, clearErrors, setError, watch, formState: { errors } } = form;
  const router = useRouter();

  const [prevCheckedId, setPrevCheckedId] = useState('');

  const checkIdDuplicated = useSetAtom(checkIdDuplicatedAtom);
  const join = useSetAtom(joinAtom);

  const {
    open: errorModalOpen,
    close: errorModalClose,
    ModalComponent: ErrorModalComponent,
  } = useModal();

  const {
    open: needDuplicatedModalOpen,
    close: needDuplicatedModalClose,
    ModalComponent: NeedDuplicatedModalComponent,
  } = useModal();

  const isIdValid = (id: string) => {
    return ID_REGEX.test(id);
  };

  const checkIdCall = async () => {
    try {
      const enteredId = getValues('id');

      clearErrors('id');

      // id regex 확인
      if (!isIdValid(enteredId)) {
        setError('id', { message: '6-20자 이내의 영문, 숫자만 가능합니다.' }, { shouldFocus: true });
        return;
      }

      setPrevCheckedId(enteredId);
      await checkIdDuplicated({ id: enteredId });
    } catch (err) {
      if (err instanceof Error && err.message === 'DUPLICATED') {
        setError('id', { message: '중복된 아이디입니다.' }, { shouldFocus: true });
      } else {
        errorModalOpen();
      }
    }
  };

  const joinCall = async (data?: DataProps): Promise<void> => {
    try {
      if (!data || prevCheckedId === '' || !!errors?.['id'] || prevCheckedId !== data.id) {
        throw 'CHECK_ID_DUPLICATED';
      }

      // 회원가입
      const res = await join({ id: data.id, password: data.password });

      if (res.success) {
        router.push('/login?redirect_uri=/join');
      }

    } catch (err) {
      if (err === 'CHECK_ID_DUPLICATED') {
        needDuplicatedModalOpen();
      } else {
        errorModalOpen();
      }
      throw err;
    }
  };

  const { isLoading: checkIdLoading, invokeFetch: checkIdHandler } = useFetcher({ apiCall: checkIdCall });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { isLoading: joinLoading, invokeFetch: joinHandler } = useFetcher({ apiCall: joinCall, unlockLoading: false });

  const isPasswordMatched = watch('password') === watch('retry-password');
  const joinButtonActive = !!watch('id') && !!watch('password') && !!form.watch('retry-password') && isPasswordMatched;

  return (
    <Form form={form} onSubmit={(data: DataProps) => {
      if (!joinButtonActive) return;
      joinHandler(data);
    }}>
      <div className={'py-10 px-4 flex flex-col gap-4 border mt-[100px]'}>
        <h2 className={'text-2xl font-medium text-center'}>회원가입</h2>
        <div className={'flex gap-2'}>
          <div style={{ flex: 1 }}>
            <Input id={'id'} label={'아이디'} />
          </div>
          <Button
            size={''}
            label={'중복확인'}
            onClick={checkIdHandler}
            loading={checkIdLoading}
            style={{
              backgroundColor: 'royalblue',
              width: '80px',
              height: '40px',
              borderRadius: '4px',
              marginTop: '34px',
            }}
          />
        </div>
        <Input id={'password'} label={'비밀번호'} type={'password'} />
        <Input id={'retry-password'} label={'비밀번호 재확인'} type={'password'} />
        <div className={'flex flex-col gap-4 my-4'}>
          <Button
            type={'submit'}
            label={'회원가입'}
            loading={joinLoading}
            size={'md-soft-round'}
            disabled={!joinButtonActive}
            style={{ backgroundColor: 'royalblue' }}
          />
        </div>
      </div>
      <NeedDuplicatedModalComponent
        title={'알림'}
        content={'아이디 중복확인이 필요합니다.'}
        buttons={[
          {
            size: 's',
            label: '확인',
            onClick: needDuplicatedModalClose,
            style: { backgroundColor: 'royalblue' },
          },
        ]}
      />
      <ErrorModalComponent
        title={'알림'}
        content={'일시적인 오류입니다.\n다시시도해주세요.'}
        buttons={[
          {
            size: 's',
            label: '확인',
            onClick: errorModalClose,
            style: { backgroundColor: 'royalblue' },
          },
        ]}
      />
    </Form>
  );
}