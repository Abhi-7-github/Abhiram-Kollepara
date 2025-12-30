import { useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { variants } from '../animations/motion';

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <m.button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/70"
            variants={variants.modalBackdrop}
            initial="initial"
            animate="animate"
            exit="exit"
          />

          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            variants={variants.modalPanel}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-green-500/20 bg-black/80 shadow-[0_0_0_1px_rgba(34,197,94,0.1),_0_0_60px_rgba(34,197,94,0.12)] backdrop-blur"
          >
            <div className="flex items-center justify-between border-b border-green-500/15 px-5 py-4">
              <div className="font-mono text-sm text-green-200">{title}</div>
              <button type="button" onClick={onClose} className="focus-neon rounded-md px-2 py-1 text-green-200/80 hover:text-green-200">
                ✕
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto px-5 py-4">{children}</div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
