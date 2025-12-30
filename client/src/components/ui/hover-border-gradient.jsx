import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { cn } from '@/lib/utils';

const DIRECTIONS = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState('TOP');

  const rotateDirection = (currentDirection) => {
    const currentIndex = DIRECTIONS.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length
      : (currentIndex + 1) % DIRECTIONS.length;
    return DIRECTIONS[nextIndex];
  };

  const movingMap = {
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)',
    BOTTOM:
      'radial-gradient(20.7% 50% at 50% 100%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)',
    RIGHT:
      'radial-gradient(16.2% 41.2% at 100% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)',
  };

  // Neon-green highlight to match your theme
  const highlight =
    'radial-gradient(75% 181.15% at 50% 50%, rgba(34, 197, 94, 0.85) 0%, rgba(34, 197, 94, 0) 70%)';

  useEffect(() => {
    if (hovered) return;

    const interval = window.setInterval(() => {
      setDirection((prev) => rotateDirection(prev));
    }, duration * 1000);

    return () => window.clearInterval(interval);
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative inline-flex h-min w-fit overflow-hidden p-px transition duration-500',
        'border border-white/10 bg-black/20 hover:bg-black/10',
        'disabled:cursor-not-allowed disabled:opacity-60',
        containerClassName
      )}
      {...props}
    >
      <div className={cn('relative z-10 w-auto rounded-[inherit]', className)}>{children}</div>

      <m.div
        className={cn('absolute inset-0 z-0 overflow-hidden rounded-[inherit]')}
        style={{ filter: 'blur(2px)' }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />

      <div className="absolute inset-[2px] z-[1] rounded-[inherit] bg-black" />
    </Tag>
  );
}
