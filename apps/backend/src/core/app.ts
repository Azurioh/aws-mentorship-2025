import { setupCors } from '@config/cors';
import { setupDecorators } from '@config/decorators/setupDecorators';
import { setupRateLimit } from '@config/rate-limit';
import { setupSwagger } from '@config/swagger';
import { router as apiRoutes } from '@routes';
import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import ApiError from '@utils/api-error';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import { Errors } from '@test-connect/shared/enums/errors';
import { environment } from '@config/environment';

/**
 * @function build
 *
 * @description This function builds the Fastify application.
 *
 * @returns {Promise<FastifyInstance>} A promise that resolves to a Fastify instance.
 */
async function build(): Promise<FastifyInstance> {
  const app: FastifyInstance = fastify({
    logger: true,
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
  app.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply.error(`The resource ${request.url} doesn't exist`, HttpStatusCode.notFound, Errors.ROUTE_NOT_FOUND);
  });

  /*!> Register the default error handler */
  app.setErrorHandler((error: unknown, _: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ApiError) {
      reply.send({
        message: error.message,
        statusCode: error.statusCode,
        ...(error.data && { data: error.data }),
      });
    } else if (error instanceof Error) {
      if (environment.NODE_ENV === 'development') {
        reply.status(HttpStatusCode.internalServerError).send({
          message: error.message,
          statusCode: Errors.INTERNAL_SERVER_ERROR,
          stack: error.stack,
        });
      } else {
        reply.status(HttpStatusCode.internalServerError).send({
          message: error.message,
          statusCode: Errors.INTERNAL_SERVER_ERROR,
        });
      }
    } else {
      app.log.error('Unhandled error occured:', error);
      reply.status(HttpStatusCode.internalServerError).send({
        message: 'An unhandled error occurred while processing your request',
        statusCode: Errors.INTERNAL_SERVER_ERROR,
      });
    }
  });

  /*!> Validator for request body schemas */
  app.setValidatorCompiler(({ schema }) => {
    const ajv = new Ajv({ coerceTypes: false, strict: true });
    ajvFormats(ajv);
    return ajv.compile(schema);
  });

  return app;
}

export default build;
