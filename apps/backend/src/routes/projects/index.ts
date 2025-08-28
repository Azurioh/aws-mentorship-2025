import type { FastifyInstance } from 'fastify';
import CreateProject from './create-project';
import ListProjects from './list-projects';
import GetProject from './get-project';
import UpdateProject from './update-project';
import DeleteProject from './delete-project';
import ListMyProjects from './list-my-projects';

export default (app: FastifyInstance) => {
  CreateProject(app);
  ListProjects(app);
  ListMyProjects(app);
  GetProject(app);
  UpdateProject(app);
  DeleteProject(app);
};
