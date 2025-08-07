import type { FastifyInstance } from 'fastify';
import { HeadersJson, ParamsJson, QuerystringJson } from './schema';
import { readNotificationHandler } from './handler';

const ReadNotification = (app: FastifyInstance) => {
  return app.route({
    method: 'PUT',
    url: '/notifications/:notificationId/read',
    schema: {
      tags: ['notifications'],
      description: 'Read a notification',
      params: ParamsJson,
      headers: HeadersJson,
      querystring: QuerystringJson,
    },
    handler: readNotificationHandler,
  });
};

export default ReadNotification;
