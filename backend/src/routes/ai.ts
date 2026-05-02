import { Router } from 'express';
import { z } from 'zod';
import { generateLegalClause, refineServiceDescription, analyzeATS } from '../services/geminiService.js';

const refineBody = z.object({
  rawInput: z.string().min(1).max(8000),
});

const clauseBody = z.object({
  request: z.string().min(1).max(8000),
});

const atsBody = z.object({
  cvData: z.any(),
  jobDescription: z.string().min(1).max(20000),
});

export const aiRouter = Router();

aiRouter.post('/refine-services', async (req, res, next) => {
  try {
    const { rawInput } = refineBody.parse(req.body);
    const items = await refineServiceDescription(rawInput);
    res.json({ items });
  } catch (e) {
    next(e);
  }
});

aiRouter.post('/generate-clause', async (req, res, next) => {
  try {
    const { request } = clauseBody.parse(req.body);
    const clause = await generateLegalClause(request);
    res.json({ clause });
  } catch (e) {
    next(e);
  }
});

aiRouter.post('/analyze-ats', async (req, res, next) => {
  try {
    const { cvData, jobDescription } = atsBody.parse(req.body);
    const analysis = await analyzeATS(cvData, jobDescription);
    res.json(analysis);
  } catch (e) {
    next(e);
  }
});
