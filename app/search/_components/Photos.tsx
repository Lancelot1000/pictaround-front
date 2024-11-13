import Photo from './Photo';

export default function Component() {
  return (
    <div className={'flex flex-wrap'}>
      <Photo data={{ location: 'http://picsum.photos/200/300', alt: 'temp' }} />
    </div>
  );
}