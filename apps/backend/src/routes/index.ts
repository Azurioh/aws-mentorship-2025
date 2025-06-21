import type { FastifyInstance } from 'fastify';
import healthRoute from './health';

export async function router(app: FastifyInstance): Promise<void> {
  app.register(healthRoute, { prefix: '/health' });
}
