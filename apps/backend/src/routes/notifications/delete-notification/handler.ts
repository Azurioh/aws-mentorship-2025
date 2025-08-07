import type { FastifyReply, FastifyRequest } from 'fastify';
import type { THeaders, TParams, TQuerystring } from './schema';
import { deleteNotification } from './db-access';

export const deleteNotificationHandler = async (
  req: FastifyRequest<{
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  const { notificationId } = req.params;

  await deleteNotification(notificationId);

  return res.success({ message: 'Notification has been deleted' });
};
