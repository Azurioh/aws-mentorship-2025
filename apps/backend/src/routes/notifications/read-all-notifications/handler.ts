import type { FastifyReply, FastifyRequest } from 'fastify';
import type { THeaders, TParams, TQuerystring } from './schema';
import { readAllNotifications } from './db-access';

export const readAllNotificationHandler = async (
  _req: FastifyRequest<{
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  await readAllNotifications('b9547ad8-3d5e-42d1-93a9-aa49503d4b4a');

  return res.success({ message: 'All notifications have been read' });
};
