import dotenv from 'dotenv';
import { connectDb } from '../src/config/db.js';
import { Skill } from '../src/models/Skill.js';
import { Project } from '../src/models/Project.js';

dotenv.config({ path: new URL('../.env', import.meta.url) });

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) throw new Error('Missing MONGODB_URI');

await connectDb(mongoUri);

const skills = [
  {
    name: 'HTML5',
    logoUrl: 'https://cdn-icons-png.flaticon.com/128/174/174854.png'
  },
  {
    name: 'CSS3',
    logoUrl: 'https://cdn-icons-png.flaticon.com/128/732/732190.png'
  },
  {
    name: 'JavaScript',
    logoUrl: 'https://cdn-icons-png.flaticon.com/128/5968/5968292.png'
  },
  {
    name: 'React.js',
    logoUrl: 'https://cdn-icons-png.flaticon.com/128/1126/1126012.png'
  },
  {
    name: 'Node.js',
    logoUrl: 'https://cdn-icons-png.flaticon.com/128/919/919825.png'
  },
  {
    name: 'Aws',
    logoUrl: 'https://cdn-icons-png.flaticon.com/128/14390/14390315.png'
  },
  {
    name: 'MongoDB',
    logoUrl: 'https://cdn-icons-png.flaticon.com/128/1602/1602309.png'
  },
  {
    name: 'Git',
    logoUrl: 'https://cdn-icons-png.flaticon.com/128/15466/15466163.png'
  }
];

const projects = [
  {
    title: 'Black Ice Dashboard',
    description: 'A hacker-themed analytics dashboard with animated charts, neon hover states, and API-driven widgets.',
    techStack: ['React', 'Tailwind', 'Framer Motion', 'Node', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80',
    githubUrl: 'https://github.com/',
    liveUrl: 'https://example.com'
  },
  {
    title: 'Terminal Ops',
    description: 'A terminal-inspired project hub with glitch typography and smooth page transitions.',
    techStack: ['React', 'Framer Motion'],
    imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1400&q=80',
    githubUrl: 'https://github.com/',
    liveUrl: 'https://example.com'
  }
];

await Skill.deleteMany({});
await Project.deleteMany({});

await Skill.insertMany(skills);
await Project.insertMany(projects);

// eslint-disable-next-line no-console
console.log('[seed] inserted skills/projects');
process.exit(0);
