'use client';

import { motion } from 'motion/react';

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="mb-10"
    >
      <span className="font-mono text-xs text-accent">{`// ${index}`}</span>
      <h2 className="mt-2 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-4 h-px w-8 bg-accent" />
    </motion.div>
  );
}
