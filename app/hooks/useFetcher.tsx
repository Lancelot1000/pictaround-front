import { useState } from 'react';

export default function useFetcher<T = void>({ apiCall, unlockLoading = true }: {
  apiCall: (data?: T | void) => Promise<void>;
  unlockLoading?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const invokeFetch = async (data?: T) => {
    try {
      if (isLoading) return;

      setIsLoading(true);
      await apiCall(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setIsLoading(false);
    } finally {
      if (unlockLoading) {
        setIsLoading(false);
      }
    }
  };

  return { isLoading, invokeFetch };
}
