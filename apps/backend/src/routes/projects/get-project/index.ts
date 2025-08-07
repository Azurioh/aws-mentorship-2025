import type { FastifyInstance } from 'fastify';
import handler from './handler';
import { Querystring, ParamsJson, Headers } from './schema';

const GetProject = (app: FastifyInstance) => {
  return app.route({
    method: 'GET',
    url: '/projects/:projectId',
    schema: {
      tags: ['projects'],
      description: '',
      querystring: Querystring,
      params: ParamsJson,
      headers: Headers,
    },
    handler,
  });
};

export default GetProject;
