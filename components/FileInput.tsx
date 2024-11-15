import { useFormContext } from 'react-hook-form';

export default function Component({ label, id, handler }) {
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
      />
    </div>
  );
}