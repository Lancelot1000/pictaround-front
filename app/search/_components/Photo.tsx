import Image from 'next/image';

export default function Component({ data }: { data: LocationInfo }) {
  return (
    <div className={'relative w-[25%] border-2 border-gray-200'}
         style={{ height: 'calc(100vw / 4)', maxHeight: '150px', zIndex: '-1' }}>
      <Image src={data.location} alt={data.name} fill objectFit="cover" />
    </div>
  );
}