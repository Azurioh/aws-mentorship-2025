import type { FastifyInstance } from 'fastify';
import { listNotificationsHandler } from './handler';
import { QuerystringJson, ParamsJson, HeadersJson } from './schema';

const ListNotifications = (app: FastifyInstance) => {
  return app.route({
    method: 'GET',
    url: '/notifications',
    schema: {
      tags: ['notifications'],
      description: '',
      querystring: QuerystringJson,
      params: ParamsJson,
      headers: HeadersJson,
    },
    handler: listNotificationsHandler,
  });
};

export default ListNotifications;
