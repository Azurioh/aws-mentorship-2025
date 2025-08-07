import type { FastifyInstance } from 'fastify';
import { readAllNotificationHandler } from './handler';
import { ParamsJson, HeadersJson, QuerystringJson } from './schema';

const ReadAllNotifications = (app: FastifyInstance) => {
  return app.route({
    method: 'PUT',
    url: '/notifications/read',
    schema: {
      tags: ['notifications'],
      description: 'Read all notifications',
      params: ParamsJson,
      headers: HeadersJson,
      querystring: QuerystringJson,
    },
    handler: readAllNotificationHandler,
  });
};

export default ReadAllNotifications;
