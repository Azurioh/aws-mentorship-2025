import 'fastify';
import type { Errors } from '@enums/errors';
import type { HttpStatusCode } from '@enums/http-status';
import type { JwtPayload } from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyRequest {
    user?: string | JwtPayload;
  }

  interface FastifyReply {
    /**
     * Sends a success response with the specified HTTP code.
     *
     * @param data - The data to send in the response.
     * @param httpCode - The HTTP code of the response.
     * @param meta - Optional metadata for the response.
     */
    success<T>(data: T, httpCode: HttpStatusCode = HttpStatusCode.ok, meta?: Record<string, unknown>): void;

    /**
     * Throws an API error with the specified HTTP code.
     *
     * @param message - The descriptive error message.
     * @param httpCode - The HTTP code to return.
     * @param statusCode - The application-specific status code.
     * @param details - Additional details about the error.
     */
    error(message: string, httpCode: HttpStatusCode, statusCode: Errors, details?: Record<string, unknown>): never;
  }
}
