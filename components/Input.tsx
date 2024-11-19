import { useFormContext } from 'react-hook-form';

type Props = {
  id: string,
  type?: string,
  label?: string,
  placeholder?: string,
}

export default function Component({ label, id, placeholder, type = 'text' }: Props) {
  const { register } = useFormContext();


  return (
    <div className={'relative'}>
      {label && <label htmlFor={id} className="block mb-2 text-base font-medium text-gray-900">{label}</label>}
      <input
        {...register(id)}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}