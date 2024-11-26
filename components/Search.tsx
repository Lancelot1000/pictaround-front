import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props<Keyword> = {
  label?: string,
  id: string,
  valueId: string,
  placeholder?: string,
  options: {
    label: string,
    value: Keyword,
  }[]
}

export default function Component({ label, id, valueId, placeholder, options = [] }: Props<Keyword>) {
  const { register, setValue } = useFormContext();

  const [showRecommend, setShowRecommend] = useState(false);
  const [keyword, setKeyword] = useState('');

  return (
    <div className={'relative'}>
      {label && <label htmlFor={id} className="block mb-2 text-base font-medium text-gray-900">{label}</label>}
      <input
        {...register(id)}
        type="text"
        value={keyword}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={e => {
          const value = e.target.value;
          setKeyword(value);
          setValue(id, value);
        }}
        onFocus={() => {
          setShowRecommend(true);
        }}
      />
      {showRecommend && options.length > 0 && (
        <div className={'absolute right-0 border w-full bg-white p-2 z-10'}>
          {options.map((option, idx) => {
            return (
              <div
                key={idx}
                className={'py-2 px-1 cursor-pointer'}
                style={{borderTop: idx !== 0 ? '1px solid lightgray' : 'none'}}
                onClick={() => {
                  setKeyword(option.label);
                  setValue(id, option.label);
                  setValue(valueId, option.value);
                  setShowRecommend(false);
                }}>
                <p>{option.label}</p>
                {option.value.address && <p className={'text-sm'}>{option.value.address}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}