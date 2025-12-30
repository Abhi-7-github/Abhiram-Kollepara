import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import LayoutTextFlipDemo from '../components/layout-text-flip-demo';
import LoaderOneDemo from '../components/loader-one-demo';
import GlitchText from '../components/GlitchText';
import { variants } from '../animations/motion';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export default function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onExplore = () => {
    if (loading) return;
    setLoading(true);

    // Small intentional delay to show the loader before navigation
    window.setTimeout(() => {
      navigate('/portfolio');
    }, 900);
  };

  return (
    <m.main variants={variants.page} initial="initial" animate="animate" exit="exit" className="min-h-dvh">
      <div className="scanlines min-h-dvh">
        <BackgroundRippleEffect />

        <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col items-center justify-center px-4 py-12">
          <div className="mb-8 font-mono text-xs text-green-200/70">
            <GlitchText text="ACCESS GRANTED" />
          </div>

          <LayoutTextFlipDemo />

          <div className="mt-8">
            <HoverBorderGradient
              as="button"
              type="button"
              onClick={onExplore}
              disabled={loading}
              containerClassName="focus-neon rounded-md"
              className="rounded-md bg-green-500/10 px-6 py-3 font-mono text-sm text-green-100 hover:bg-green-500/15"
            >
              {loading ? 'exploring…' : 'Explore'}
            </HoverBorderGradient>
          </div>

          <AnimatePresence>
            {loading ? (
              <m.div
                className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoaderOneDemo />
              </m.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-10 text-center text-xs text-green-200/50">
            <span className="font-mono">Hint:</span> press Explore to enter the portfolio
          </div>
        </div>
      </div>
    </m.main>
  );
}
