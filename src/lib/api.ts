import axios from 'axios';
import { AuditLog, SystemStats, Task } from '../types/core';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  async getAuditLogs(): Promise<AuditLog[]> {
    const { data } = await client.get('/audit');
    return data;
  },

  async getTasks(): Promise<Task[]> {
    const { data } = await client.get('/tasks');
    return data;
  },

  async createTask(task: Partial<Task>): Promise<Task> {
    const { data } = await client.post('/tasks', task);
    return data;
  },

  async getSystemStats(): Promise<SystemStats> {
    const { data } = await client.get('/stats');
    return data;
  },

  async checkHealth(): Promise<{ status: string; version: string }> {
    const { data } = await client.get('/health');
    return data;
  }
};
