import { setupCors } from "@config/cors";
import { setupDecorators } from "@config/decorators/setupDecorators";
import { setupRateLimit } from "@config/rate-limit";
import { setupSwagger } from "@config/swagger";
import { router as apiRoutes } from "@routes";
import Ajv from "ajv";
import ajvFormats from "ajv-formats";
import fastify, { type FastifyInstance } from "fastify";
import { errorHandler, notFoundHandler } from "@config/error-handler";

const build = (): FastifyInstance => {
    const app = fastify({
        bodyLimit: 10 * 1024 * 1024,
        ignoreTrailingSlash: true,
    });

    /*!> Setup decorators */
    setupDecorators(app);

   

    app.get("/docs-check", async () => {
        return { status: "ok" };
    });

    /*!> Setup Fastify plugins */
    setupCors(app);
    setupRateLimit(app);
    setupSwagger(app);

    /*!> Setup the routers */
    // app.register(apiRoutes);

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
