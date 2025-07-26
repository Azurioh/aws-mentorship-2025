import type { FastifyInstance } from 'fastify';
import handler from './handler';
import { Body, Querystring, Params, Headers } from './schema';

const CreatProject = (app: FastifyInstance) => {
  return app.route({
    method: 'POST',
    url: '/projects',
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

export default CreatProject;
