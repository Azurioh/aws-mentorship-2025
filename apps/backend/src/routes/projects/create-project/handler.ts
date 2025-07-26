import type { FastifyReply, FastifyRequest } from 'fastify';
import { Body, BodyToData, type TBody, type THeaders, type TParams, type TQuerystring } from './schema';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import { createProject } from './db-access';

const handler = async (
  req: FastifyRequest<{
    Body: TBody;
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  const body = Body.parse(req.body);
  const data = BodyToData(body);

  const project = await createProject(data);

  return res.success(project, HttpStatusCode.created);
};

export default handler;
