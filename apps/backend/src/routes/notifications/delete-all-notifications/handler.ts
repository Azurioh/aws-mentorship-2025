import type { FastifyReply, FastifyRequest } from 'fastify';
import type { THeaders, TParams, TQuerystring } from './schema';
import { deleteAllNotifications } from './db-access';

export const deleteAllNotificationsHandler = async (
  _req: FastifyRequest<{
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  await deleteAllNotifications('b9547ad8-3d5e-42d1-93a9-aa49503d4b4a');

  return res.success({ message: 'All notifications have been deleted' });
};
