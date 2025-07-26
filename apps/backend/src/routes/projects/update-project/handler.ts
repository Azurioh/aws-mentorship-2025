import type { FastifyRequest, FastifyReply } from 'fastify';
import { Body, type TBody, type THeaders, type TParams, type TQuerystring } from './schema';
import { updateProject } from './db-access';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';

const handler = async (
  req: FastifyRequest<{
    Body: TBody;
    Params: TParams;
    Querystring: TQuerystring;
    Headers: THeaders;
  }>,
  res: FastifyReply,
) => {
  const { projectId } = req.params;
  const body = Body.parse(req.body);

  await updateProject(projectId, body);

  return res.success(null, HttpStatusCode.noContent);
};

export default handler;
