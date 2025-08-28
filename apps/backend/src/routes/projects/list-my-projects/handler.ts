import type { FastifyReply, FastifyRequest } from 'fastify';
import type { THeaders, TParams, TQuerystring } from './schema';
import { listProjects } from '@repositories/projects/list-projects';

const handler = async (
  req: FastifyRequest<{
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  const projects = await listProjects(req.user!.sub! as string);

  return res.success(projects);
};

export default handler;
