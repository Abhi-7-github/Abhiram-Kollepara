import { Router } from 'express';
import mongoose from 'mongoose';
import { Skill } from '../models/Skill.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const skillsRouter = Router();

skillsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const skills = await Skill.find({}).sort({ name: 1 }).lean();
    res.json({ data: skills });
  })
);

skillsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = req.body;

    try {
      if (Array.isArray(body)) {
        const createdMany = await Skill.insertMany(body, {
          ordered: true
        });
        res.status(201).json({ data: createdMany, count: createdMany.length });
        return;
      }

      const { name, logoUrl } = body ?? {};
      const created = await Skill.create({ name, logoUrl });
      res.status(201).json({ data: created });
    } catch (err) {
      // Handle unique index violation on name
      if (err?.code === 11000) {
        res.status(409).json({
          error: {
            message: 'Skill with this name already exists'
          }
        });
        return;
      }
      throw err;
    }
  })
);

skillsRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: { message: 'Invalid skill id' } });
      return;
    }

    const { name, logoUrl } = req.body ?? {};
    const updates = {};
    if (typeof name === 'string') updates.name = name;
    if (typeof logoUrl === 'string') updates.logoUrl = logoUrl;

    if (!Object.keys(updates).length) {
      res.status(400).json({ error: { message: 'Nothing to update' } });
      return;
    }

    try {
      const updated = await Skill.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
      });

      if (!updated) {
        res.status(404).json({ error: { message: 'Skill not found' } });
        return;
      }

      res.json({ data: updated });
    } catch (err) {
      if (err?.code === 11000) {
        res.status(409).json({ error: { message: 'Skill with this name already exists' } });
        return;
      }
      throw err;
    }
  })
);

skillsRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: { message: 'Invalid skill id' } });
      return;
    }

    const deleted = await Skill.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: { message: 'Skill not found' } });
      return;
    }

    res.json({ ok: true });
  })
);
