'use client';

import { useAtomValue } from 'jotai';
import { useSetAtom } from 'jotai/index';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import useFetcher from '@/app/hooks/useFetcher';
import useModal from '@/app/hooks/useModal';
import { categoriesAtom } from '@/atom/common';
import * as Fetch from '@/atom/fetch';
import { createReviewAtom, uploadImageAtom } from '@/atom/search';
import Button from '@/components/Button';
import CommonImage from '@/components/CommonImage';
import FileInput from '@/components/FileInput';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Search from '@/components/Search';
import Select from '@/components/Select';

type RegisterForm = {
  category: string,
  keyword: string,
  location: Keyword,
  imageLocation: string,
  comment: string,
}

export default function Page() {
  const form = useForm<RegisterForm>();
  const router = useRouter();

  const uploadImage = useSetAtom(uploadImageAtom);
  const createReview = useSetAtom(createReviewAtom);

  const categories = useAtomValue(categoriesAtom);

  const [blobImage, setBlobImage] = useState<string>('');
  const [keywordOptions, setKeywordOptions] = useState<{ label: string, value: Keyword }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    open: successModalOpen,
    close: successModalClose,
    ModalComponent: SuccessModalComponent,
  } = useModal();
  const {
    open: errorModalOpen,
    close: errorModalClose,
    ModalComponent: ErrorModalComponent,
  } = useModal();

  const watchedKeyword: string = form.watch('keyword');
  const categoryOptions = categories.map(category => ({
    label: category.label,
    value: category.id,
  }));

  // 검색
  useEffect(() => {
    if (!watchedKeyword) return;

    const debounceTimer = setTimeout(() => {
      findKeyword(watchedKeyword);
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };

  }, [watchedKeyword]);

  // 검색 키워드
  const findKeyword = async (query: string) => {
    try {
      const res = await Fetch.searchLocationInformation({ query });
      const keywords = res.map((e: Keyword) => {
        return {
          label: e.title,
          value: e,
        };
      });
      setKeywordOptions(keywords);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
    }
  };

  const onFileUploadHandler = async (file: File) => {
    try {
      // TODO: 추후 자동 resize 로직 추가
      if (file.size > 1024 * 1024 * 2) {
        setErrorMessage('파일 최대 크기는 2MB입니다.');
        errorModalOpen();
        return;
      }

      const imageLocation = await uploadImage({
        route: 'reviews/',
        filename: file.name,
        extension: file.type.split('/')[1],
        type: file.type,
        file: file,
      });

      form.setValue('imageLocation', imageLocation);

      setBlobImage(window.URL.createObjectURL(file));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setErrorMessage('일시적인 오류입니다.\n다시 시도해주세요.');
      errorModalOpen();
    }
  };

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      if (data.category === '0') throw '카테고리를 선택해주세요.';
      if (!data.keyword || (data.keyword !== data.location?.title)) throw '장소를 선택해주세요.';
      if (!data.imageLocation) throw '이미지를 선택해주세요.';
      if (!data.comment) throw '코멘트를 남겨주세요.';

      const res = await createReview({
        categoryId: data.category,
        comment: data.comment,
        location: data.location,
        imageLocation: data.imageLocation,
      });

      if (res.success) {
        successModalOpen();
      }
    } catch (err) {
      if (typeof err === 'string') {
        setErrorMessage(err);
        errorModalOpen();
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
        errorModalOpen();
      }
      throw err;
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { isLoading, invokeFetch } = useFetcher<RegisterForm>({ apiCall: onSubmit, unlockLoading: !false });

  return (
    <div className={'p-4'}>
      <h2 className={'hidden'}>장소 등록</h2>
      <Form form={form} onSubmit={invokeFetch}>
        <div className={'mb-4'}>
          <Select label={'카테고리'} id={'category'} options={categoryOptions} />
        </div>
        <div className={'mb-4'}>
          <Search
            label={'장소'}
            id={'keyword'}
            valueId={'location'}
            options={keywordOptions}
            placeholder={'장소를 입력해주세요.'}
          />
        </div>
        <div className={'pb-2'}>
          <FileInput
            id={'file'}
            label={'이미지 업로더'}
            accept={'.jpg, .jpeg, .png'}
            handler={onFileUploadHandler}
          />
        </div>
        {blobImage && (
          <CommonImage
            width={'300px'}
            height={'300px'}
            alt={'미리보기 이미지'}
            objectFit={'contain'}
            imageLocation={blobImage}
            styles={{ marginBottom: '4px' }}

          />
        )}
        <div className={'my-4'}>
          <Input label={'한줄평 (최대 40자)'} id={'comment'} placeholder={'이 곳을 한 줄로 나타낸다면?'} maxLength={40} />
        </div>
        <div className={'my-[20px]'}>
          <Button
            label={'등록'}
            type={'submit'}
            loading={isLoading}
            size={'m-soft-round'}
            style={{ backgroundColor: 'royalblue', width: '100%' }}
          />
        </div>
      </Form>
      <ErrorModalComponent
        title={'알림'}
        content={errorMessage}
        buttons={[
          {
            size: 's',
            label: '확인',
            onClick: errorModalClose,
            style: { backgroundColor: 'royalblue' },
          },
        ]}
      />
      <SuccessModalComponent
        title={'등록완료'}
        content={'정상적으로 리뷰가 등록되었습니다.'}
        buttons={[

          {
            size: 's',
            label: '둘러보기',
            onClick: () => {
              successModalClose();
              router.push('/search');
            },
            style: { backgroundColor: 'gray' },
          },
          {
            size: 's',
            label: '추가 등록',
            onClick: () => {
              successModalClose();
              window.location.reload();
            },
            style: { backgroundColor: 'royalblue' },
          },
        ]}
      />
    </div>
  )
    ;
}