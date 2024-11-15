'use client';

import { useAtomValue } from 'jotai';
import { useSetAtom } from 'jotai/index';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { categoriesAtom, findCategoriesAtom } from '@/atom/common';
import Button from '@/components/Button';
import FileInput from '@/components/FileInput';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Search from '@/components/Search';
import Select from '@/components/Select';

type RegisterForm = {
  imageLocation: string,
  content: string,
  date: string,
}

export default function Page() {
  const form = useForm<RegisterForm>();

  const findCategories = useSetAtom(findCategoriesAtom);

  const categories = useAtomValue(categoriesAtom);

  console.log({ categories });

  const categoriesCalling = async () => {
    try {
      // 셋팅된 것이 없다면
      if (categories.length < 2) {
        await findCategories();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    categoriesCalling();
  }, []);

  const onFileUploadHandler = (file: File) => {
    console.log(file);
  }

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    console.log(data);
  };

  return (
    <div className={'p-4'}>
      <h2 className={'hidden'}>장소 등록</h2>
      <Form form={form} onSubmit={onSubmit}>
        <div className={'mb-4'}>
          <Select label={'카테고리'} id={'category'} options={categories} />
        </div>
        {/* TODO: 검색 추천어 넣어야 함 */}
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
        <div>
          <FileInput id={'file'} label={'이미지 업로더'} handler={onFileUploadHandler} />
        </div>
        <div className={'my-4'}>
          <Input label={'설명'} id={'content'} placeholder={'이 곳을 한 줄로 나타낸다면?'} />
        </div>
        <div className={'my-[20px]'}>
          <Button label={'등록'} type={'submit'} size={'m-soft-round'}
                  style={{ backgroundColor: 'royalblue', width: '100%' }} />
        </div>
      </Form>
    </div>
  )
    ;
}