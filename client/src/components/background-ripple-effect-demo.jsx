import React from 'react';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';

export default function BackgroundRippleEffectDemo() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="mt-60 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center font-mono text-2xl font-bold text-green-100 md:text-4xl lg:text-7xl">
          Interactive Background Boxes Ripple Effect
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center font-mono text-green-200/70">
          Hover over the boxes above and click. Use it for backgrounds of hero or call-to-action sections.
        </p>
      </div>
    </div>
  );
}
