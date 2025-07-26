import type { FastifyInstance } from 'fastify';
import CreateProject from './create-project';

export default (app: FastifyInstance) => {
  CreateProject(app);
};
