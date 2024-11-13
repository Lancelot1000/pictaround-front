import Category from './Category';

export default function Component({ categories }: { categories: Categories }) {
  return (
    <div className={'flex gap-2 my-2 px-4 overflow-x-scroll non-scroll'}>
      {categories.map(category => {
        return (
          <Category key={category.id} data={category} />
        );
      })}
    </div>
  );
}