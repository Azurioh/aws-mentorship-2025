import type { FastifyInstance } from 'fastify';
import { deleteNotificationHandler } from './handler';
import { ParamsJson, HeadersJson, QuerystringJson } from './schema';

const DeleteNotification = (app: FastifyInstance) => {
  return app.route({
    method: 'DELETE',
    url: '/notifications/:notificationId',
    schema: {
      tags: ['notifications'],
      description: 'Delete a notification',
      params: ParamsJson,
      headers: HeadersJson,
      querystring: QuerystringJson,
    },
    handler: deleteNotificationHandler,
  });
};

export default DeleteNotification;
