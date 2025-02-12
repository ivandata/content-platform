import { useState, useCallback } from 'react';

export interface ImageLoaderCallbacks {
  onLoad?: () => void;
  onError?: () => void;
}

export const useImageLoader = ({ onLoad, onError }: ImageLoaderCallbacks) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  return { isLoading, isError, handleLoad, handleError };
};
