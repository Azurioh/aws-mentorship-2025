import type { FastifyReply, FastifyRequest } from 'fastify';
import type { THeaders, TParams, TQuerystring } from './schema';
import { listProjects } from '@repositories/projects/list-projects';

const handler = async (
  _req: FastifyRequest<{
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  const projects = await listProjects('b9547ad8-3d5e-42d1-93a9-aa49503d4b4a');

  return res.success(projects);
};

export default handler;
