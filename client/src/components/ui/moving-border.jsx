import { useRef, useState } from 'react';
import {
  m,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export function Button({
  borderRadius = '1rem',
  children,
  as: Component = 'div',
  containerClassName,
  borderClassName,
  duration = 3000,
  className,
  ...otherProps
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Component
      className={cn('relative w-full overflow-hidden bg-transparent p-[1px]', containerClassName)}
      style={{ borderRadius }}
      onMouseEnter={(e) => {
        setHovered(true);
        otherProps?.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        otherProps?.onMouseLeave?.(e);
      }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="22%" ry="22%" active={hovered}>
          <div
            className={cn(
              'h-20 w-20 bg-[radial-gradient(rgba(34,197,94,0.9)_40%,transparent_60%)] opacity-[0.8]',
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          'relative flex w-full items-center justify-start antialiased backdrop-blur-xl',
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  active = true,
  ...otherProps
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    if (!active) return;

    const length = pathRef.current?.getTotalLength?.();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <m.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform,
        }}
      >
        {children}
      </m.div>
    </>
  );
};
