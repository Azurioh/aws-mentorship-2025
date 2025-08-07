import type { FastifyReply, FastifyRequest } from 'fastify';
import type { THeaders, TParams, TQuerystring } from './schema';
import { deleteProject } from './db-access';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';

const handler = async (
  req: FastifyRequest<{
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  const { projectId } = req.params;

  await deleteProject(projectId);

  return res.success(null, HttpStatusCode.noContent);
};

export default handler;
