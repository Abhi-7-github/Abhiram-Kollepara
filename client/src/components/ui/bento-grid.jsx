import { cn } from '@/lib/utils';

export function BentoGrid({ className, children }) {
  return (
    <div
      className={cn(
        'mx-auto grid w-full grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  onClick,
}) {
  const clickable = typeof onClick === 'function';

  return (
    <div
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!clickable) return;
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      className={cn(
        'group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border border-green-500/15',
        'bg-black/40 p-5 text-left backdrop-blur-sm transition duration-200 hover:border-green-500/35',
        clickable ? 'cursor-pointer focus-neon' : '',
        className
      )}
    >
      {header ? <div className="relative">{header}</div> : null}

      <div className="transition duration-200 group-hover/bento:translate-x-1">
        {icon ? <div className="text-green-200/70">{icon}</div> : null}
        {title ? <div className="mt-2 font-mono text-base text-green-100">{title}</div> : null}
        {description ? <div className="mt-2 text-sm text-green-200/70">{description}</div> : null}
      </div>
    </div>
  );
}
