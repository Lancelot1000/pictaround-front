import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  id: string,
  type?: string,
  label?: string,
  placeholder?: string,
  maxLength?: number,
}

export default function Component({ label, id, placeholder, type = 'text', maxLength }: Props) {
  const { register, setValue, formState: { errors } } = useFormContext();

  const [keyword, setKeyword] = useState('');

  const errorMessage = (errors?.[id]?.message || '').toString();

  return (
    <div className={'relative'}>
      {label && <label htmlFor={id} className="block mb-2 text-base font-medium text-gray-900">{label}</label>}
      <input
        {...register(id)}
        type={type}
        value={keyword}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={(e) => {
          const value = maxLength ? e.target.value.slice(0, maxLength) : e.target.value;
          setKeyword(value);
          setValue(id, value);
        }}
      />
      {!!errorMessage && (
        <p className={'text-base text-red-600 pt-1'}>{errorMessage}</p>
      )}
    </div>
  );
}