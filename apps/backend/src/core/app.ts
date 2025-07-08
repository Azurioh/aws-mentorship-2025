import { setupCors } from '@config/cors';
import { setupDecorators } from '@config/decorators/setupDecorators';
import { setupRateLimit } from '@config/rate-limit';
import { setupSwagger } from '@config/swagger';
import { router as apiRoutes } from '@routes';
import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import fastify, { type FastifyInstance } from 'fastify';
import { errorHandler, notFoundHandler } from '@config/error-handler';

/**
 * @function build
 *
 * @description This function builds the Fastify application.
 *
 * @returns {Promise<FastifyInstance>} A promise that resolves to a Fastify instance.
 */
async function build(): Promise<FastifyInstance> {
  const app: FastifyInstance = fastify({
    bodyLimit: 10 * 1024 * 1024,
    ignoreTrailingSlash: true,
  });

  /*!> Setup decorators */
  setupDecorators(app);

  /*!> Setup Fastify plugins */
  setupCors(app);
  setupRateLimit(app);
  setupSwagger(app);

  /*!> Setup the routers */
  app.register(apiRoutes);

  /*!> Register the not found error handler */
  app.setNotFoundHandler(notFoundHandler);

  /*!> Register the default error handler */
  app.setErrorHandler(errorHandler);

  /*!> Validator for request body schemas */
  app.setValidatorCompiler(({ schema }) => {
    const ajv = new Ajv({ coerceTypes: false, strict: true });
    ajvFormats(ajv);
    return ajv.compile(schema);
  });

  return app;
}

export default build;
