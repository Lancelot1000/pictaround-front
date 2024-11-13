import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  label?: string,
  id: string,
  placeholder?: string,
  options?: {
    label: string,
    value: string
  }[]
}

export default function Component({ label, id, placeholder, options = [] }: Props) {
  const [showRecommend, setShowRecommend] = useState(false);

  const { register, setValue } = useFormContext();


  return (
    <div className={'relative'}>
      {label && <label htmlFor={id} className="block mb-2 text-base font-medium text-gray-900">{label}</label>}
      <input
        {...register(id)}
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onFocus={() => {
          setShowRecommend(true);
        }}
        onBlur={() => {
          setShowRecommend(false);
        }}
      />
      {showRecommend && options.length > 0 && (
        <div className={'absolute right-0 border w-full bg-white p-2'}>
          {options.map(option => {
            return (
              <div
                key={Math.random()}
                className={'border p-1 cursor-pointer'}
                onClick={() => {
                  setValue(id, option.value);
                }}>
                <p>{option.label}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}