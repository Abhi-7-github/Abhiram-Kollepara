import { IconArrowWaveRightUp } from '@tabler/icons-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

const Skeleton = () => (
  <div className="h-full min-h-[6rem] w-full rounded-xl border border-green-500/10 bg-black/30" />
);

export default function BentoGridDemo() {
  const items = [
    {
      title: 'The Dawn of Innovation',
      description: 'Explore the birth of groundbreaking ideas and inventions.',
      header: <Skeleton />,
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-green-200/70" />,
    },
  ];

  return (
    <BentoGrid className="mx-auto max-w-4xl">
      {items.map((item, i) => (
        <BentoGridItem key={i} {...item} />
      ))}
    </BentoGrid>
  );
}
