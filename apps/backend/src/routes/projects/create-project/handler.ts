import type { FastifyReply, FastifyRequest } from 'fastify';
import { Body, BodyToData, type TBodyJson, type THeaders, type TParams, type TQuerystring } from './schema';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import { createProject } from './db-access';

const handler = async (
  req: FastifyRequest<{
    Body: TBodyJson;
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  const body = Body.parse(req.body);
  const data = BodyToData(body);

  await createProject(data);

  return res.success(data, HttpStatusCode.created);
};

export default handler;
