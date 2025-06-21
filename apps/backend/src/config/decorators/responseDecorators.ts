import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import ApiError from '@utils/api-error';
import type { FastifyReply } from 'fastify';

/**
 * Send a success response with the HTTP code specified.
 *
 * @param this - The FastifyReply instance.
 * @param data - Data to send through response
 * @param httpCode - The HTTP code
 * @param meta - Optional metadata
 */
export function success<T>(
  this: FastifyReply,
  data: T,
  httpCode: HttpStatusCode = HttpStatusCode.ok,
  meta?: Record<string, unknown>,
): void {
  this.code(httpCode).send({
    status: 'success',
    data,
    ...(meta && { meta }),
  });
}

/**
 * Send an error response with the HTTP code specified.
 *
 * @param this - The FastifyReply instance.
 * @param message - The error message.
 * @param httpCode - The HTTP code
 * @param statusCode - The status code specific to the app.
 * @param details - Optional additionnal details.
 */
export function error(
  this: FastifyReply,
  message: string,
  httpCode: HttpStatusCode = HttpStatusCode.badRequest,
  statusCode: Errors = Errors.BAD_REQUEST,
  details?: Record<string, unknown>,
): never {
  this.code(httpCode);
  throw new ApiError(httpCode, statusCode, message, details);
}
