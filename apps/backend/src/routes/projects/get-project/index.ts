import type { FastifyInstance } from 'fastify';
import handler from './handler';
import { Querystring, Params, Headers } from './schema';

const GetProject = (app: FastifyInstance) => {
  return app.route({
    method: 'GET',
    url: '/projects/:projectId',
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

export default GetProject;
