import type { FastifyInstance } from 'fastify';
import { error, success } from './responseDecorators';

export function setupDecorators(app: FastifyInstance): void {
  app.decorateReply('success', success);
  app.decorateReply('error', error);
}
