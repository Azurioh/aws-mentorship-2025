import type { FastifyInstance } from 'fastify';
import handler from './handler';
import { Querystring, Params, Headers } from './schema';

const ListProjects = (app: FastifyInstance) => {
  return app.route({
    method: 'GET',
    url: '/projects',
    schema: {
      tags: ['projects'],
      description: '',
      querystring: Querystring,
      params: Params,
      headers: Headers,
    },
    handler,
  });
};

export default ListProjects;
