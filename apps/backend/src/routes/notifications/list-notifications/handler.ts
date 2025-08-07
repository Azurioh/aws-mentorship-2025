import type { FastifyReply, FastifyRequest } from 'fastify';
import type { THeaders, TParams, TQuerystring } from './schema';
import { listNotifications } from '@repositories/notifications/list-notifications';

export const listNotificationsHandler = async (
  _req: FastifyRequest<{
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  const notifications = await listNotifications('b9547ad8-3d5e-42d1-93a9-aa49503d4b4a');

  return res.success(notifications);
};
