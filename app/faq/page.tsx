import Link from 'next/link';

export default function Page() {
  return (
    <div className={'flex flex-col my-[100px] items-center'}>
      <h2 className={'hidden'}>To be updated later</h2>
      <div className={'flex flex-col items-center gap-[20px]'}>
        <p>추후 업데이트 예정입니다.</p>
        <Link href="/">
          <span className={'underline text-center'}>홈으로 이동하기</span>
        </Link>
      </div>
    </div>
  );
}