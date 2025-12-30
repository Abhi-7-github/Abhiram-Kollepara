import { Router } from 'express';
import mongoose from 'mongoose';
import { Project } from '../models/Project.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const projectsRouter = Router();

projectsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    res.json({ data: projects });
  })
);

projectsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const created = await Project.create(req.body ?? {});
      res.status(201).json({ data: created });
    } catch (err) {
      if (err?.code === 11000) {
        res.status(409).json({ error: { message: 'Project with this title already exists' } });
        return;
      }
      throw err;
    }
  })
);

projectsRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: { message: 'Invalid project id' } });
      return;
    }

    const body = req.body ?? {};
    const updates = {};
    const updatableKeys = ['title', 'description', 'techStack', 'imageUrl', 'githubUrl', 'liveUrl'];
    for (const key of updatableKeys) {
      if (key in body) updates[key] = body[key];
    }

    if (!Object.keys(updates).length) {
      res.status(400).json({ error: { message: 'Nothing to update' } });
      return;
    }

    try {
      const updated = await Project.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
      });

      if (!updated) {
        res.status(404).json({ error: { message: 'Project not found' } });
        return;
      }

      res.json({ data: updated });
    } catch (err) {
      if (err?.code === 11000) {
        res.status(409).json({ error: { message: 'Project with this title already exists' } });
        return;
      }
      throw err;
    }
  })
);

projectsRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: { message: 'Invalid project id' } });
      return;
    }

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: { message: 'Project not found' } });
      return;
    }

    res.json({ ok: true });
  })
);
