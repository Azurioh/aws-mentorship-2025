import type { FastifyInstance } from 'fastify';
import handler from './handler';
import { BodyJson, QuerystringJson, ParamsJson, HeadersJson } from './schema';

const UpdateProject = (app: FastifyInstance) => {
  return app.route({
    method: 'PUT',
    url: '/projects/:projectId',
    schema: {
      tags: ['projects'],
      description: '',
      body: BodyJson,
      querystring: QuerystringJson,
      params: ParamsJson,
      headers: HeadersJson,
    },
    handler,
  });
};

export default UpdateProject;
