import type { FastifyInstance } from 'fastify';
import CreateProject from './create-project';
import ListProjects from './list-projects';
import GetProject from './get-project';
import UpdateProject from './update-project';
import DeleteProject from './delete-project';

export default (app: FastifyInstance) => {
  CreateProject(app);
  ListProjects(app);
  GetProject(app);
  UpdateProject(app);
  DeleteProject(app);
};
