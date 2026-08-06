import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackHome() {
  return (
    <div className="px-6 pt-20 md:pt-6 sm:px-8">
        <Link
        href="/"
        className="group inline-flex items-center gap-1.5 font-mono text-xs text-faint-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft
          size={12}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        back
      </Link>
    </div>
  );
}
