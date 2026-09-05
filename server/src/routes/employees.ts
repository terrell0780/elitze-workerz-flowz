import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware';
import { getEmployeeById, listEmployees } from '../repositories/employees';

export const employeesRouter: Router = Router();

const querySchema = z.object({
  q: z.string().trim().max(120).optional(),
  department: z.string().trim().max(60).optional(),
  status: z.enum(['available', 'busy', 'enterprise-only']).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  sort: z.enum(['name', 'rating', 'dailyRate', 'deployed']).default('name'),
  order: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(200).default(24),
});

const paramsSchema = z.object({ id: z.string().regex(/^EMP-\d{4}$/, 'Invalid employee id') });

employeesRouter.get('/employees', validate({ query: querySchema }), (req, res) => {
  res.json(listEmployees(req.query as unknown as z.infer<typeof querySchema>));
});

employeesRouter.get('/employees/:id', validate({ params: paramsSchema }), (req, res) => {
  res.json(getEmployeeById(req.params.id));
});
