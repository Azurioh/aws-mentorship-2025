/// <reference path="./types/fastify.d.ts" />
import { environment } from '@config/environment';
import build from '@core/app';

/**
 * @function start
 *
 * @description Starts the server.
 */
async function start(): Promise<void> {
  const app = build();

  await app.listen({ port: 3008, host: '0.0.0.0' });
}

start();
