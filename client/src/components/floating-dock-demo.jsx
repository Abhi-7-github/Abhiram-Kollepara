import React from 'react';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconHome,
  IconMail,
  IconCode
} from '@tabler/icons-react';

export default function FloatingDockDemo() {
  // TODO: Replace these URLs with your real profiles
  const links = [
    {
      title: 'Home',
      icon: <IconHome className="h-full w-full text-green-200/70" />,
      href: '#top'
    },
    {
      title: 'Contact',
      icon: <IconMail className="h-full w-full text-green-200/70" />,
      href: 'mailto:abhikollepara333@gmail.com'
    },
    {
      title: 'GitHub',
      icon: <IconBrandGithub className="h-full w-full text-green-200/70" />,
      href: 'https://github.com/Abhi-7-github'
    },
    {
      title: 'LeetCode',
      icon: <IconCode className="h-full w-full text-green-200/70" />,
      href: 'https://leetcode.com/u/Abhi-7/'
    },
    {
      title: 'LinkedIn',
      icon: <IconBrandLinkedin className="h-full w-full text-green-200/70" />,
      href: 'https://www.linkedin.com/in/abhiram-kollepara-395a5331a/'
    },
    {
      title: 'Instagram',
      icon: <IconBrandInstagram className="h-full w-full text-green-200/70" />,
      href: 'https://www.instagram.com/abhiram._.0117/'
    }
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex items-center justify-center px-4">
      <div className="pointer-events-auto">
        <FloatingDock items={links} />
      </div>
    </div>
  );
}
