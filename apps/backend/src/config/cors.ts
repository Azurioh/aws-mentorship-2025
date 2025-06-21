import fastifyCors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';

export const setupCors = (app: FastifyInstance): void => {
  app.register(fastifyCors, { origin: '*' });
};
