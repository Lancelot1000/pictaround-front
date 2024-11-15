'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import Input from '@/components/Input';
import Form from '@/components/Form';
import Search from '@/components/Search';

type RegisterForm = {
  imageLocation: string,
  content: string,
  date: string,
}

export default function Page() {
  const form = useForm<RegisterForm>();

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    console.log(data);
  };

  return (
    <div className={'p-4'}>
      <h2 className={'hidden'}>장소 등록</h2>
      <Form form={form} onSubmit={onSubmit}>
        <div className={'mb-4'}>
          <Search
            label={'장소'}
            id={'location'}
            placeholder={'장소를 입력해주세요.'}
            options={[
              { label: '장소1', value: '장소1' },
              { label: '장소2', value: '장소2' },
              { label: '장소3', value: '장소3' },
            ]}
          />
        </div>
        <div className={'border flex mb-4'}>
          <div className={'border w-[300px] h-[300px]'}>
            이미지 미리보기
          </div>

        </div>
        <Input label={'설명'} id={'content'} placeholder={'이 곳을 한 줄로 나타낸다면?'} />
      </Form>
    </div>
  )
    ;
}