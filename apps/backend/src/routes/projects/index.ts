import type { FastifyInstance } from 'fastify';
import CreateProject from './create-project';
import ListProjects from './list-projects';
import GetProject from './get-project';

export default (app: FastifyInstance) => {
  CreateProject(app);
  ListProjects(app);
  GetProject(app);
};
