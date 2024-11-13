import Button from '../app/_components/Button';

export default function Home() {

  return (
    <div>
      <div className="flex h-20 relative overflow-hidden z-[-1]">
        <div className="gradient left-[-10%] bg-gradient-to-r from-cyan-500 to-blue-500" />
        <div className="gradient left-[+20%] bg-gradient-to-r from-blue-500 to-indigo-500" />
        <div className="gradient left-[+50%] bg-gradient-to-r from-indigo-500 to-pink-500" />
        <div className="gradient left-[+80%] bg-gradient-to-r from-pink-500 to-orange-500" />
      </div>
      <section>
        <article>
          <h2 className="hidden">소개</h2>
          <div className={'pt-[90px] pb-[120px] grid gap-6'}>
            <p className={'center text-2xl font-medium opacity-0'}
               style={{ animation: `fadeInUp 0.7s forwards 0.5s` }}>근처 맛집 찾기에 최적화된</p>
            <p className={'logo center text-3xl opacity-0'}
               style={{ animation: `fadeInUp 0.7s forwards 0.6s` }}>PictARound</p>
            <div className={'flex justify-center opacity-0'} style={{ animation: `fadeInUp 0.7s forwards 0.7s` }}>
              <Button label={'바로가기'} size={'m'} style={{ backgroundColor: '#343336' }} route={'/search'} />
            </div>
          </div>
        </article>
        <article>
          <h3 className="hidden">설명</h3>
          <div className="px-5 py-[120px]">
            <p className={'text-2xl pb-3 font-semibold opacity-0'}
               style={{ animation: `fadeInUp 0.7s forwards 1.1s` }}>블로그와 지도를 번갈아가며</p>
            <p className={'text-2xl pb-6 font-semibold opacity-0'}
               style={{ animation: `fadeInUp 0.7s forwards 1.1s` }}>장소를 찾아보고 있는 당신,</p>
            <p className={'text-2xl pb-3 font-semibold opacity-0'}
               style={{ animation: `fadeInUp 0.7s forwards 1.5s` }}>바로 근처 아무 곳이나</p>
            <p className={'text-2xl pb-20 font-semibold opacity-0'}
               style={{ animation: `fadeInUp 0.7s forwards 1.5s` }}>들어가고 싶은 당신,</p>
            <p className={'text-2xl font-medium center opacity-0'}
               style={{ animation: `fadeInUp 0.7s forwards 1.8s` }}>pictARound에서 찾아보세요.</p>
          </div>
        </article>
      </section>
    </div>
  );
}
