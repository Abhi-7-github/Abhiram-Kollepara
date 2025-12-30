import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { connectDb } from './config/db.js';
import { skillsRouter } from './routes/skills.js';
import { projectsRouter } from './routes/projects.js';
import { contactRouter } from './routes/contact.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: false
  })
);
app.use(express.json({ limit: '64kb' }));

if (env.nodeEnv !== 'production') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/skills', skillsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await connectDb(env.mongoUri);

app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] listening on http://localhost:${env.port}`);
});
