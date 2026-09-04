import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../server/src/app';
import type { Deployment, MetricsSummary, Paginated } from '@shared/types';
import type { AIEmployee } from '@shared/types';

const app = createApp();

describe('health', () => {
  it('reports liveness', async () => {
    const response = await request(app).get('/health').expect(200);
    expect(response.body).toMatchObject({ status: 'ok', service: 'zevanto-api' });
    expect(typeof response.body.uptimeSeconds).toBe('number');
  });

  it('reports readiness including the database check', async () => {
    const response = await request(app).get('/health/ready').expect(200);
    expect(response.body.checks.database).toBe('up');
  });
});

describe('employees', () => {
  it('returns a paginated catalogue', async () => {
    const response = await request(app).get('/api/v1/employees').expect(200);
    const body = response.body as Paginated<AIEmployee>;
    expect(body.total).toBe(1000);
    expect(body.data).toHaveLength(24);
    expect(body.page).toBe(1);
  });

  it('filters by department using the values stored on each record', async () => {
    const response = await request(app).get('/api/v1/employees?department=Customer%20Support').expect(200);
    const body = response.body as Paginated<AIEmployee>;
    expect(body.total).toBeGreaterThan(0);
    expect(body.data.every((employee) => employee.department === 'Customer Support')).toBe(true);
  });

  it('returns one employee by id', async () => {
    const response = await request(app).get('/api/v1/employees/EMP-0001').expect(200);
    expect((response.body as AIEmployee).id).toBe('EMP-0001');
  });

  it('404s for an unknown but well-formed id', async () => {
    const response = await request(app).get('/api/v1/employees/EMP-9999').expect(404);
    expect(response.body.error.code).toBe('NOT_FOUND');
  });

  it('rejects a malformed id instead of querying with it', async () => {
    const response = await request(app).get('/api/v1/employees/EMP-NOPE').expect(400);
    expect(response.body.error.code).toBe('BAD_REQUEST');
  });

  it('rejects out-of-range pagination', async () => {
    await request(app).get('/api/v1/employees?pageSize=9999').expect(400);
    await request(app).get('/api/v1/employees?page=0').expect(400);
  });
});

describe('departments', () => {
  it('counts employees per department from the roster', async () => {
    const response = await request(app).get('/api/v1/departments').expect(200);
    const departments = response.body.data as { name: string; employeeCount: number }[];
    const total = departments.reduce((sum, department) => sum + department.employeeCount, 0);
    expect(total).toBe(1000);
  });
});

describe('deployments', () => {
  it('creates a deployment and reflects it in metrics', async () => {
    const before = (await request(app).get('/api/v1/metrics/summary').expect(200)).body as MetricsSummary;

    const created = await request(app)
      .post('/api/v1/deployments')
      .send({ employeeId: 'EMP-0042', status: 'active' })
      .expect(201);

    const deployment = created.body as Deployment;
    expect(deployment.employeeId).toBe('EMP-0042');
    expect(deployment.status).toBe('active');

    const listed = (await request(app).get('/api/v1/deployments?status=active').expect(200)).body as { data: Deployment[] };
    expect(listed.data.some((item) => item.id === deployment.id)).toBe(true);

    const after = (await request(app).get('/api/v1/metrics/summary').expect(200)).body as MetricsSummary;
    expect(after.activeEmployees).toBe(before.activeEmployees + 1);
  });

  it('rejects a deployment for an unknown employee', async () => {
    await request(app).post('/api/v1/deployments').send({ employeeId: 'EMP-9999' }).expect(404);
  });

  it('rejects an invalid payload', async () => {
    await request(app).post('/api/v1/deployments').send({ employeeId: 'not-an-id' }).expect(400);
  });

  it('requires an admin token to retire a deployment', async () => {
    const created = (await request(app).post('/api/v1/deployments').send({ employeeId: 'EMP-0055' }).expect(201))
      .body as Deployment;

    await request(app).delete(`/api/v1/deployments/${created.id}`).expect(401);

    const token = (
      await request(app)
        .post('/api/v1/auth/pin')
        .send({ pin: process.env.ADMIN_PIN })
        .expect(200)
    ).body.token as string;

    await request(app)
      .delete(`/api/v1/deployments/${created.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});

describe('auth', () => {
  it('issues a token for the correct PIN', async () => {
    const response = await request(app)
      .post('/api/v1/auth/pin')
      .send({ pin: process.env.ADMIN_PIN })
      .expect(200);
    expect(typeof response.body.token).toBe('string');
    expect(Date.parse(response.body.expiresAt)).toBeGreaterThan(Date.now());
  });

  it('rejects an incorrect PIN', async () => {
    const wrong = process.env.ADMIN_PIN === '0000' ? '1111' : '0000';
    const response = await request(app).post('/api/v1/auth/pin').send({ pin: wrong }).expect(401);
    expect(response.body.error.code).toBe('UNAUTHORIZED');
  });

  it('never echoes the submitted PIN back', async () => {
    const response = await request(app).post('/api/v1/auth/pin').send({ pin: '0000' }).expect(401);
    expect(JSON.stringify(response.body)).not.toContain('0000');
  });
});

describe('hardening', () => {
  it('returns a structured JSON error for unknown API routes', async () => {
    const response = await request(app).get('/api/v1/does-not-exist').expect(404);
    expect(response.body.error.code).toBe('NOT_FOUND');
    expect(response.body.requestId).toBeTruthy();
  });

  it('sets common security headers', async () => {
    const response = await request(app).get('/health').expect(200);
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-powered-by']).toBeUndefined();
  });

  it('attaches a correlation id to every response', async () => {
    const response = await request(app).get('/health').expect(200);
    expect(response.headers['x-request-id']).toMatch(/^[0-9a-f-]{36}$/);
  });
});
