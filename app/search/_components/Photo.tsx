import Image from 'next/image';

export default function Component({ data }: { data: { location: string, alt: string } }) {
  return (
    <div className={'relative w-[25%] border-2 border-gray-200'}
         style={{ height: 'calc(100vw / 4)', maxHeight: '120px', zIndex: '-1' }}>
      <Image src={data.location} alt={data.alt} fill objectFit="cover" />
    </div>
  );
}