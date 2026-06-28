'use client';

import { useState, useEffect } from 'react';

function formatSystemTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  const ms = String(date.getMilliseconds()).padStart(3, '0').slice(0, 2);
  return `${h}:${m}:${s}:${ms}`;
}

function formatSystemDate(date: Date): string {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${mo}.${d}`;
}

export function useSystemClock(intervalMs = 80) {
  const [time, setTime] = useState(() => formatSystemTime(new Date()));
  const [date, setDate] = useState(() => formatSystemDate(new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setTime(formatSystemTime(now));
      setDate(formatSystemDate(now));
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return { time, date };
}
