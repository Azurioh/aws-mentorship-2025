import type { FastifyInstance } from 'fastify';
import { ParamsJson, QuerystringJson, HeadersJson } from './schema';
import handler from './handler';

const DeleteProject = (app: FastifyInstance) => {
  return app.route({
    method: 'DELETE',
    url: '/projects/:projectId',
    schema: {
      tags: ['projects'],
      description: '',
      querystring: QuerystringJson,
      params: ParamsJson,
      headers: HeadersJson,
    },
    handler,
  });
};

export default DeleteProject;
