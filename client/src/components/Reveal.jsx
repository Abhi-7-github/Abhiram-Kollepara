import { m } from 'framer-motion';
import { variants } from '../animations/motion';

export default function Reveal({ children, className = '' }) {
  return (
    <m.div
      className={className}
      variants={variants.reveal}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: '0px 0px -120px 0px' }}
    >
      {children}
    </m.div>
  );
}
