import { m } from 'framer-motion';
import { variants } from '../animations/motion';

export default function NeonCard({ children, className = '', onClick }) {
  const clickable = typeof onClick === 'function';

  return (
    <m.div
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!clickable) return;
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      variants={variants.neonHover}
      initial="rest"
      whileHover="hover"
      className={`rounded-2xl border border-green-500/15 bg-black/40 p-5 text-left backdrop-blur-sm ${
        clickable ? 'cursor-pointer focus-neon' : ''
      } ${className}`}
    >
      {children}
    </m.div>
  );
}
