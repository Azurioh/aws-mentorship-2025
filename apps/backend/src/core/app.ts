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
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { JwtPayload } from "jsonwebtoken";

const COGNITO_ISSUER = `https://cognito-idp.eu-west-3.amazonaws.com/${environment.COGNITO_ID}`;
const JWKS = createRemoteJWKSet(new URL(`${COGNITO_ISSUER}/.well-known/jwks.json`));


import "@fastify/jwt"

type MyJWT = {
  sub: string
  given_name: string
  family_name: string
  email: string
  email_verified: boolean
  origin_jti: string
  iss: string
  aud: string
  event_id: string
  token_use: string
  auth_time: number
  exp: number
  iat: number
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: MyJWT
    user: MyJWT   // 👈 req.user sera directement de ce type
  }
}
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

  

  /*!> Setup the routers */
  // app.register(apiRoutes);

  
  app.addHook('onRequest', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (req.url === "/projects" && req.method === "GET") return   //? ptddrr c'est tellement immonde mais j'ai tellement pas le temps. Je vais appeler cette ligne "Le middleware v2"


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.code(401).send({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.substring('Bearer '.length);

    try {
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: COGNITO_ISSUER,
        algorithms: ['RS256'],
      });
      req.user = payload as MyJWT
    } catch (err) {
      res.code(401).send({ message: 'Invalid token' });
    }
  });



  

  /*!> Register the not found error handler */
  app.setNotFoundHandler(notFoundHandler);

  /*!> Register the default error handler */
  app.setErrorHandler(errorHandler);

  /*!> Validator for request body schemas */
  // app.setValidatorCompiler(({ schema }) => {
  //   const ajv = new Ajv({ coerceTypes: false, strict: true });
  //   ajvFormats(ajv);
  //   return ajv.compile(schema);
  // });

  if (environment.STAGE && environment.STAGE === 'dev') {
    setupSwagger(app);
    app.register((instance, opts, done) => {
      apiRoutes(app);
      done()
    })
  } else {
    apiRoutes(app);
  }

  return app;
};

export default build;
