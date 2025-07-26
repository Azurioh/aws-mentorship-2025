import type { FastifyInstance } from 'fastify';
import { Body, Params, Querystring, Headers } from './schema';
import handler from './handler';

const DeleteProject = (app: FastifyInstance) => {
  return app.route({
    method: 'DELETE',
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

export default DeleteProject;
