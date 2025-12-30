import { useEffect, useMemo, useState } from 'react';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
}

export default function TerminalTyping({
  lines,
  speedMs = 18,
  className = ''
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const all = useMemo(() => (Array.isArray(lines) ? lines : [String(lines || '')]), [lines]);

  const [text, setText] = useState('');
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(all.join('\n'));
      return;
    }

    let raf = 0;
    const full = all.join('\n');
    let i = 0;
    let last = performance.now();

    const tick = (t) => {
      const elapsed = t - last;
      if (elapsed >= speedMs) {
        i = Math.min(full.length, i + Math.max(1, Math.floor(elapsed / speedMs)));
        setText(full.slice(0, i));
        last = t;
      }
      if (i < full.length) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [all, prefersReducedMotion, speedMs]);

  useEffect(() => {
    const id = window.setInterval(() => setCursorOn((v) => !v), 500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={className}>
      <div className="rounded-xl border border-green-500/20 bg-black/40 px-4 py-3 shadow-[0_0_0_1px_rgba(34,197,94,0.08),_0_0_40px_rgba(34,197,94,0.06)]">
        <div className="text-xs text-green-300/80">terminal</div>
        <pre className="mt-2 whitespace-pre-wrap font-mono text-sm leading-relaxed text-green-100">
          <span className="text-green-400">&gt;</span> {text}
          <span className={cursorOn ? 'opacity-100' : 'opacity-0'}>▌</span>
        </pre>
      </div>
    </div>
  );
}
