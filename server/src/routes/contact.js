import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { ContactMessage } from '../models/ContactMessage.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const contactRouter = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false
});

contactRouter.post(
  '/',
  contactLimiter,
  asyncHandler(async (req, res) => {
    const { name, email, message } = req.body ?? {};

    const saved = await ContactMessage.create({
      name,
      email,
      message
    });

    res.status(201).json({
      data: {
        id: saved._id,
        createdAt: saved.createdAt
      }
    });
  })
);
