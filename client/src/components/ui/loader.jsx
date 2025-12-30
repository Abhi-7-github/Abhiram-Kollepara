import { m } from 'framer-motion';

export function LoaderOne() {
  return (
    <div className="grid place-items-center">
      <m.div
        className="h-12 w-12 rounded-full border border-green-500/30"
        style={{ borderTopColor: 'rgba(34,197,94,0.9)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
      />
      <div className="mt-3 font-mono text-xs text-green-200/70">loading…</div>
    </div>
  );
}
