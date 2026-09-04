import { Router } from 'express';
import { z } from 'zod';
import { requireAdmin, validate } from '../middleware';
import { createDeployment, deleteDeployment, listDeployments } from '../repositories/deployments';

export const deploymentsRouter: Router = Router();

const createSchema = z.object({
  employeeId: z.string().regex(/^EMP-\d{4}$/, 'Invalid employee id'),
  department: z.string().trim().min(1).max(60).optional(),
  dailyRate: z.number().positive().max(100_000).optional(),
  status: z.enum(['provisioning', 'active', 'paused', 'retired']).default('provisioning'),
});

const listQuerySchema = z.object({
  status: z.enum(['provisioning', 'active', 'paused', 'retired']).optional(),
});

const paramsSchema = z.object({ id: z.string().min(1).max(64) });

deploymentsRouter.get('/deployments', validate({ query: listQuerySchema }), (req, res) => {
  const { status } = req.query as z.infer<typeof listQuerySchema>;
  res.json({ data: listDeployments(status) });
});

deploymentsRouter.post('/deployments', validate({ body: createSchema }), (req, res) => {
  const deployment = createDeployment(req.body);
  res.status(201).json(deployment);
});

/** Retiring a deployment is destructive, so it is admin-gated. */
deploymentsRouter.delete('/deployments/:id', requireAdmin, validate({ params: paramsSchema }), (req, res) => {
  deleteDeployment(req.params.id);
  res.status(204).send();
});
