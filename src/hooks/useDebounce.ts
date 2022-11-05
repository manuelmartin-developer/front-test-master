import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number) => {
  // Component states
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Lifecycle component
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return debouncedValue;
};
