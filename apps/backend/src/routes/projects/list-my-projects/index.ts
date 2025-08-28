import type { FastifyInstance } from 'fastify';
import handler from './handler';
import { QuerystringJson, ParamsJson, HeadersJson } from './schema';

const ListMyProjects = (app: FastifyInstance) => {
  return app.route({
    method: 'GET',
    url: '/projects/me',
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

export default ListMyProjects;
