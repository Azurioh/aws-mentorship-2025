import { setupCors } from '@config/cors';
import { setupDecorators } from '@config/decorators/setupDecorators';
import { setupRateLimit } from '@config/rate-limit';
import { setupSwagger } from '@config/swagger';
import { router as apiRoutes } from '@routes';
import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import fastify, { type FastifyInstance } from 'fastify';
import { errorHandler, notFoundHandler } from '@config/error-handler';
import { environment } from '@config/environment';
import { createRemoteJWKSet } from 'jose';

const COGNITO_ISSUER = `https://cognito-idp.eu-west-3.amazonaws.com/${environment.COGNITO_ID}`;
const JWKS = createRemoteJWKSet(new URL(`${COGNITO_ISSUER}/.well-known/jwks.json`));

const build = (): FastifyInstance => {
  const app = fastify({
    bodyLimit: 10 * 1024 * 1024,
    ignoreTrailingSlash: true,
  });

  /*!> Setup decorators */
  setupDecorators(app);

  app.get('/docs-check', async (req, res) => {
    console.log(JSON.stringify(req));
    return { status: 'ok' };
  });

  /*!> Setup Fastify plugins */
  setupCors(app);
  setupRateLimit(app);

  if (environment.NODE_ENV && environment.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  /*!> Setup the routers */
  // app.register(apiRoutes);

  app.addHook('onRequest', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.code(401).send({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.substring('Bearer '.length);

    // Ensuite tu peux faire la validation de ton JWT
    try {
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: COGNITO_ISSUER,
        algorithms: ['RS256'],
      });
      req.user = payload;
    } catch (err) {
      res.code(401).send({ message: 'Invalid token' });
    }
  });

  apiRoutes(app);

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
};

export default build;
