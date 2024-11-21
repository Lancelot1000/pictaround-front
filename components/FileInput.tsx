import { useFormContext } from 'react-hook-form';

type Props = {
  label: string;
  id: string;
  handler: (file: File) => void;
}

export default function Component({ label, id, handler } : Props) {
  const { register } = useFormContext();


  return (
    <div className={'relative'}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
          {label}
        </label>
      )}
      <input
        {...register(id)}
        type={'file'}
        onChange={(e) => {
          Array.from(e.target.files ?? []).forEach((file: File) => {
            handler(file);
          });
        }}
        className={'file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-500'}
      />
    </div>
  );
}