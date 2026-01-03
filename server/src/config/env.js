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

  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const wildcardTokenToRegExp = (token) => {
    // Support patterns like:
    // - https://*.netlify.app
    // - *.netlify.app (interpreted as host pattern, allowing http/https)
    const hasScheme = token.includes('://');
    const escaped = escapeRegExp(token).replace(/\\\*/g, '.*');
    if (hasScheme) {
      return new RegExp(`^${escaped}$`);
    }

    // Match full origin with scheme.
    return new RegExp(`^https?:\\/\\/${escaped}$`);
  };

  const origins = value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.includes('*')) return '*';

  const parsed = origins.map((origin) => (origin.includes('*') ? wildcardTokenToRegExp(origin) : origin));

  return parsed.length <= 1 ? (parsed[0] ?? 'http://localhost:5173') : parsed;
};
