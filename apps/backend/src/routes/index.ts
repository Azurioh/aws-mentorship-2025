import type { FastifyInstance } from 'fastify';
// import healthRoute from './health';
import projects from './projects';


export const router = (app: FastifyInstance) => {
  projects(app);
}

