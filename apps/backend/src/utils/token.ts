import type { FastifyRequest } from 'fastify';
import JWTService from 'src/services/jwt-service';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import { UserTokenSchema, type UserToken } from '@test-connect/shared/schemas/user';
import ApiError from './api-error';

/**
 * @function getAccessToken
 * @description Get the access token from the request
 * @param req - The request object
 * @returns The access token
 */
export const getAccessToken = (req: FastifyRequest): string => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new ApiError(HttpStatusCode.unauthorized, Errors.UNAUTHORIZED, 'No authorization header');
  }
  const [type, token] = authorization.split(' ');
  if (type !== 'Bearer') {
    throw new ApiError(HttpStatusCode.unauthorized, Errors.UNAUTHORIZED, 'Invalid authorization header');
  }
  return token;
};

/**
 * @function getAccessTokenData
 * @description Get the access token data from the request
 * @param req - The request object
 * @returns The access token data
 */
export const getAccessTokenData = (req: FastifyRequest): UserToken => {
  const accessToken = getAccessToken(req);
  const decoded = JWTService.getInstance().verifyToken(accessToken);
  const userToken = UserTokenSchema.parse(decoded.decoded);
  return userToken;
};
