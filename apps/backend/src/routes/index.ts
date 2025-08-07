import type { FastifyInstance } from 'fastify';
// import healthRoute from './health';
import projects from './projects';
import notifications from './notifications';

export const router = (app: FastifyInstance) => {
  projects(app);
  notifications(app);
};
