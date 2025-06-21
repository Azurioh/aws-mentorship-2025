import type { FastifyReply, FastifyRequest } from 'fastify';

const handler = async (_req: FastifyRequest, res: FastifyReply) => {
  return res.success(`Server is running since ${process.uptime()} seconds`);
};

export default handler;
