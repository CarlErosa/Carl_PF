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
        className="flex items-center gap-2"
      >
        <div className="h-2 w-2 rounded-full bg-line" />
        <div className="h-3 w-16 animate-pulse rounded bg-line" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="flex items-center gap-2"
    >
      <span className="font-mono text-sm tabular-nums text-foreground">
        {display.toLocaleString()}
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-faint-foreground">
        visitors
      </span>
    </motion.div>
  );
}
