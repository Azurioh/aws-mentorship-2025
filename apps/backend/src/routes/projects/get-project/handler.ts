import type { FastifyReply, FastifyRequest } from 'fastify';
import type { THeaders, TParams, TQuerystring } from './schema';
import { getProject } from '@repositories/projects/get-project';

const handler = async (
  req: FastifyRequest<{
    Headers: THeaders;
    Params: TParams;
    Querystring: TQuerystring;
  }>,
  res: FastifyReply,
) => {
  const { projectId } = req.params;

  const project = await getProject(projectId);

  return res.success(project);
};

export default handler;
