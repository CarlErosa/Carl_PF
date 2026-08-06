'use client';

import { motion } from 'motion/react';

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
  tag?: string;
}

export default function SectionHeading({ index, title, description, tag }: SectionHeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="mb-8"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        {tag ? `${tag} · ${index}` : `// ${index}`}
      </span>
      <h2 className="mt-2 text-xl font-light tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-5 border-b border-line" />
    </motion.header>
  );
}
