import { m } from 'framer-motion';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';

export default function LayoutTextFlipDemo() {
  return (
    <div>
      <m.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text="Welcome to "
          words={['Abhiram Kollepara', 'Fight Club', 'The Matrix', 'The Jungle']}
        />
      </m.div>
      <p className="mt-4 text-center text-sm text-green-200/70">
        Enter the portfolio. Explore projects, skills, and contact.
      </p>
    </div>
  );
}
