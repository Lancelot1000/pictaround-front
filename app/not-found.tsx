import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={'flex flex-col my-[100px] items-center'}>
      <h2 className={'hidden'}>Not Found</h2>
      <div className={'flex flex-col items-center gap-[20px]'}>
        <p>현재 경로로 접근할 수 없습니다.</p>
        <Link href="/">
          <span className={'underline text-center'}>홈으로 이동하기</span>
        </Link>
      </div>
    </div>
  );
}