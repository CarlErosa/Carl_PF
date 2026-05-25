'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    fetch('/api/visitors')
      .then((res) => res.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => setCount(0));
  }, []);

  useEffect(() => {
    if (count === null) return;

    if (count === 0) {
      setDisplay(0);
      return;
    }

    const step = Math.max(1, Math.floor(count / 50));
    const interval = setInterval(() => {
      setDisplay((prev) => {
        const next = prev + step;
        if (next >= count) {
          clearInterval(interval);
          return count;
        }
        return next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [count]);

  if (count === null) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="flex items-center gap-2 mt-10"
      >
        <div className="w-2 h-2 rounded-full bg-[#6FCF7C]" />
        <div className="w-16 h-4 rounded bg-[#1F2D22] animate-pulse" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="flex items-center gap-2 mt-10"
    >
      <span className="w-2 h-2 rounded-full bg-[#6FCF7C] pulse-visited" />
      <span className="text-[#6FCF7C] font-mono text-base sm:text-lg tabular-nums">
        {display.toLocaleString()}
      </span>
      <span className="text-[#7A9180] font-mono text-sm sm:text-base">
        visitors
      </span>
    </motion.div>
  );
}
