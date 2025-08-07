import type { FastifyInstance } from 'fastify';
import { deleteAllNotificationsHandler } from './handler';
import { ParamsJson, HeadersJson, QuerystringJson } from './schema';

const DeleteAllNotifications = (app: FastifyInstance) => {
  return app.route({
    method: 'DELETE',
    url: '/notifications',
    schema: {
      tags: ['notifications'],
      description: 'Delete all notifications',
      params: ParamsJson,
      headers: HeadersJson,
      querystring: QuerystringJson,
    },
    handler: deleteAllNotificationsHandler,
  });
};

export default DeleteAllNotifications;
