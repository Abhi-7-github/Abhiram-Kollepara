import { useAnimate, m } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Button({ className, children, onClick, disabled, type = 'button', ...props }) {
  const [scope, animate] = useAnimate();

  const animateLoading = async () => {
    await animate(
      '.loader',
      {
        width: '20px',
        scale: 1,
        display: 'block',
      },
      { duration: 0.2 }
    );
  };

  const animateHideLoader = async () => {
    await animate(
      '.loader',
      {
        width: '0px',
        scale: 0,
        display: 'none',
      },
      { duration: 0.2 }
    );
  };

  const animateSuccess = async () => {
    await animateHideLoader();

    await animate(
      '.check',
      {
        width: '20px',
        scale: 1,
        display: 'block',
      },
      { duration: 0.2 }
    );

    await animate(
      '.check',
      {
        width: '0px',
        scale: 0,
        display: 'none',
      },
      { delay: 2, duration: 0.2 }
    );
  };

  const handleClick = async (event) => {
    if (disabled) return;

    await animateLoading();
    try {
      await onClick?.(event);
      await animateSuccess();
    } catch (err) {
      await animateHideLoader();
      throw err;
    }
  };

  return (
    <m.button
      layout
      ref={scope}
      type={type}
      disabled={disabled}
      className={cn(
        'focus-neon flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-md',
        'bg-green-500/10 px-4 py-2 text-sm text-green-100 ring-1 ring-green-500/20',
        'transition duration-200 hover:bg-green-500/15 disabled:cursor-not-allowed disabled:opacity-60',
        className
      )}
      {...props}
      onClick={handleClick}
    >
      <m.div layout className="flex items-center gap-2">
        <Loader />
        <CheckIcon />
        <m.span layout>{children}</m.span>
      </m.div>
    </m.button>
  );
}

const Loader = () => {
  return (
    <m.svg
      animate={{ rotate: [0, 360] }}
      initial={{ scale: 0, width: 0, display: 'none' }}
      style={{ scale: 0.5, display: 'none' }}
      transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-green-100"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </m.svg>
  );
};

const CheckIcon = () => {
  return (
    <m.svg
      initial={{ scale: 0, width: 0, display: 'none' }}
      style={{ scale: 0.5, display: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check text-green-100"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </m.svg>
  );
};
