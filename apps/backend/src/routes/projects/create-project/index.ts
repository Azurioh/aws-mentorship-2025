import type { FastifyInstance } from 'fastify';
import handler from './handler';
import { BodyJson, QuerystringJson, ParamsJson, HeadersJson } from './schema';

const CreateProject = (app: FastifyInstance) => {
  return app.route({
    method: 'POST',
    url: '/projects',
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

export default CreateProject;
