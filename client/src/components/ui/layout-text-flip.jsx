import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { cn } from '@/lib/utils';

export function LayoutTextFlip({
  text = 'Welcome to',
  words = ['Abhiram Kollepara', 'MERN Stack', 'Framer Motion', 'Black Ops UI'],
  duration = 3000
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => window.clearInterval(interval);
  }, [duration, words.length]);

  return (
    <>
      <m.span layoutId="subtext" className="font-mono text-2xl font-bold tracking-tight text-green-100 md:text-4xl">
        {text}
      </m.span>

      <m.span
        layout
        className="relative w-fit overflow-hidden rounded-md border border-green-500/15 bg-black/70 px-4 py-2 font-mono text-2xl font-bold tracking-tight text-green-100 shadow-[0_0_0_1px_rgba(34,197,94,0.12),_0_0_40px_rgba(34,197,94,0.06)] md:text-4xl"
      >
        <AnimatePresence mode="popLayout">
          <m.span
            key={currentIndex}
            initial={{ y: -40, filter: 'blur(10px)' }}
            animate={{ y: 0, filter: 'blur(0px)' }}
            exit={{ y: 50, filter: 'blur(10px)', opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={cn('inline-block whitespace-nowrap')}
          >
            {words[currentIndex]}
          </m.span>
        </AnimatePresence>
      </m.span>
    </>
  );
}
