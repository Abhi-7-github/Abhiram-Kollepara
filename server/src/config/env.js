import dotenv from 'dotenv';

dotenv.config({ path: new URL('../../.env', import.meta.url) });

const required = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  mongoUri: required('MONGODB_URI'),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173'
};

export const parseCorsOrigin = (value) => {
  if (!value) return 'http://localhost:5173';
  if (value === '*') return '*';

  const origins = value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins.length <= 1 ? (origins[0] ?? 'http://localhost:5173') : origins;
};
