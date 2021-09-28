import React, { useState, useEffect } from 'react';

export function useDebounce(value: string, timeout: number, callback: any) {
  const [timer, setTimer] = useState<any | null>(null);

  const { setTimeout, clearTimeout } = window;
  const clearTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    clearTimer();

    if (value && callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
  }, [value]);
}
