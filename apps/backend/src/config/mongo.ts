import fastifyMongo from '@fastify/mongodb';
import type { FastifyInstance } from 'fastify';
import { environment } from './environment';

export const setupMongoDB = (app: FastifyInstance) => {
  app.register(fastifyMongo, {
    forceClose: true,
    url: environment.MONGO_URI,
  });
};
