import type { FastifyInstance } from 'fastify';
import handler from './handler';
import { QuerystringJson, ParamsJson, HeadersJson } from './schema';

const ListProjects = (app: FastifyInstance) => {
  return app.route({
    method: 'GET',
    url: '/projects',
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

export default ListProjects;
