import type { FastifyReply, FastifyRequest } from 'fastify';
import type { THeaders, TParams, TQuerystring } from './schema';
import { readNotification } from './db-access';

export const readNotificationHandler = async (
  req: FastifyRequest<{
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  const { notificationId } = req.params;

  await readNotification(notificationId);

  return res.success({ message: 'Notification has been read' });
};
