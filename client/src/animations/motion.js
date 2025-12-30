export const easing = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.2, 0.8, 0.2, 1]
};

export const durations = {
  fast: 0.18,
  base: 0.35,
  slow: 0.6
};

export const variants = {
  page: {
    initial: { opacity: 0, filter: 'blur(10px)', y: 10 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: durations.base, ease: easing.smooth } },
    exit: { opacity: 0, filter: 'blur(10px)', y: -10, transition: { duration: durations.fast, ease: easing.snappy } }
  },

  fadeUp: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 }
  },

  reveal: {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0, transition: { duration: durations.base, ease: easing.smooth } }
  },

  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.06
      }
    }
  },

  neonHover: {
    rest: {
      y: 0,
      boxShadow: '0 0 0 rgba(34,197,94,0)',
      transition: { duration: durations.fast, ease: easing.snappy }
    },
    hover: {
      y: -2,
      boxShadow: '0 0 0 1px rgba(34,197,94,0.35), 0 0 32px rgba(34,197,94,0.18)',
      transition: { duration: durations.base, ease: easing.smooth }
    }
  },

  modalBackdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: durations.fast } },
    exit: { opacity: 0, transition: { duration: durations.fast } }
  },

  modalPanel: {
    initial: { opacity: 0, y: 18, scale: 0.98, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: durations.base, ease: easing.smooth } },
    exit: { opacity: 0, y: 8, scale: 0.98, filter: 'blur(8px)', transition: { duration: durations.fast, ease: easing.snappy } }
  }
};
