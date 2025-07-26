import type { FastifyInstance } from 'fastify';
import handler from './handler';
import { Body, Querystring, Params, Headers } from './schema';

const UpdateProject = (app: FastifyInstance) => {
  return app.route({
    method: 'PUT',
    url: '/projects/:projectId',
    schema: {
      tags: ['projects'],
      description: '',
      body: Body,
      querystring: Querystring,
      params: Params,
      headers: Headers,
    },
    handler,
  });
};

export default UpdateProject;
