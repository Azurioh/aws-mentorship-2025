import type { FastifyInstance } from 'fastify';
import CreateProject from './create-project';
import ListProjects from './list-projects';

export default (app: FastifyInstance) => {
  CreateProject(app);
  ListProjects(app);
};
