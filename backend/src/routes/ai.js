import { Router } from 'express';
import { z } from 'zod';
import { config } from '../config.js';
import { generateLegalClause, refineServiceDescription, analyzeDocumentRisks, generateProjectTimeline } from '../services/geminiService.js';

const refineBody = z.object({
  rawInput: z.string().min(1).max(8000),
});

const clauseBody = z.object({
  request: z.string().min(1).max(8000),
});

export const aiRouter = Router();

aiRouter.post('/refine-services', async (req, res, next) => {
  try {
    const { rawInput } = refineBody.parse(req.body);
    const items = await refineServiceDescription(config.geminiApiKey, rawInput);
    res.json({ items });
  } catch (e) {
    next(e);
  }
});

aiRouter.post('/generate-clause', async (req, res, next) => {
  try {
    const { request } = clauseBody.parse(req.body);
    const clause = await generateLegalClause(config.geminiApiKey, request);
    res.json({ clause });
  } catch (e) {
    next(e);
  }
});

aiRouter.post('/analyze-risks', async (req, res, next) => {
  try {
    const risks = await analyzeDocumentRisks(config.geminiApiKey, req.body);
    res.json(JSON.parse(risks));
  } catch (e) {
    next(e);
  }
});

aiRouter.post('/generate-timeline', async (req, res, next) => {
  try {
    const { services } = req.body;
    const timeline = await generateProjectTimeline(config.geminiApiKey, services);
    res.json(JSON.parse(timeline));
  } catch (e) {
    next(e);
  }
});
