import { useEffect, useRef } from 'react';

interface UseAutosaveOptions {
  value: string;
  onSave: (value: string) => void;
  delay?: number;
}

export function useAutosave({ value, onSave, delay = 1000 }: UseAutosaveOptions) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousValueRef = useRef(value);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only save if value has changed
    if (value !== previousValueRef.current) {
      timeoutRef.current = setTimeout(() => {
        onSave(value);
        previousValueRef.current = value;
      }, delay);
    }

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, onSave, delay]);

  // Save immediately on blur
  const saveImmediately = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (value !== previousValueRef.current) {
      onSave(value);
      previousValueRef.current = value;
    }
  };

  return { saveImmediately };
}