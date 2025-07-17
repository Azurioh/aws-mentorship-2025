import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { environment } from '@config/environment';
import type { FastifyInstance } from 'fastify';

export const setupSwagger = (app: FastifyInstance): void => {
  const apibaseUrl: string = environment.API_BASE_URL;

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API',
        description: 'documentation API',
        version: '0.1.0',
      },
      servers: [{ url: apibaseUrl }],
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    staticCSP: true,
    transformSpecification: (swaggerObject) => swaggerObject
  });
};
