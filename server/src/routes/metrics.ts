import { Router } from 'express';
import { getMetricsSummary } from '../repositories/metrics';

export const metricsRouter: Router = Router();

metricsRouter.get('/metrics/summary', (_req, res) => {
  res.json(getMetricsSummary());
});
