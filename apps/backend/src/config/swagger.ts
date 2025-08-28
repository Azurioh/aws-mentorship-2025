import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { environment } from '@config/environment';
import type { FastifyInstance } from 'fastify';
import {
  validatorCompiler,
  serializerCompiler,

} from "fastify-type-provider-zod";

export const setupSwagger = (app: FastifyInstance): void => {
  const apibaseUrl: string = "http://localhost:3000"


  // app.setValidatorCompiler(validatorCompiler);
  // app.setSerializerCompiler(serializerCompiler);

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
    routePrefix: "/docs",
    staticCSP: true,
    transformSpecification: (swaggerObject) => swaggerObject,
    uiConfig: {
        docExpansion: "full",
        deepLinking: false,
    },
});
};
