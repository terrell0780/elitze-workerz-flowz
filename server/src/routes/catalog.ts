import { Router } from 'express';
import { DEPARTMENTS, EXECUTIVE_AIS, PLATFORM_STATS, PRICING_TIERS } from '@shared/catalog';
import { listDepartments } from '../repositories/employees';

export const catalogRouter: Router = Router();

/** Departments with live employee counts from the roster. */
catalogRouter.get('/departments', (_req, res) => {
  res.json({ data: listDepartments() });
});

catalogRouter.get('/executives', (_req, res) => {
  res.json({ data: EXECUTIVE_AIS });
});

catalogRouter.get('/pricing', (_req, res) => {
  res.json({ data: PRICING_TIERS });
});

catalogRouter.get('/stats', (_req, res) => {
  res.json({ data: PLATFORM_STATS });
});

export { DEPARTMENTS };
