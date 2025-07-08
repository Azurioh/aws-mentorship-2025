import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import ApiError from '@utils/api-error';
import Logger from '@utils/logger';
import Singleton from '@utils/singleton';
import jwt from 'jsonwebtoken';

export default class JWTService extends Singleton<JWTService> {
  signToken = (payload: object): string => {
    try {
      const token = jwt.sign(payload, environment.JWT_SECRET, { expiresIn: '1h' });
      return token;
    } catch (error) {
      Logger.getInstance().error(`Error signing the token: ${error}`);
      throw new ApiError(
        HttpStatusCode.internalServerError,
        Errors.INTERNAL_SERVER_ERROR,
        'An error occurred while signing the token',
      );
    }
  };

  signTokenNoExpiration = (payload: object): string => {
    try {
      const token = jwt.sign(payload, environment.JWT_SECRET);
      return token;
    } catch (error) {
      Logger.getInstance().error(`Error signing the token: ${error}`);
      throw new ApiError(
        HttpStatusCode.internalServerError,
        Errors.INTERNAL_SERVER_ERROR,
        'An error occurred while signing the token',
      );
    }
  };

  verifyToken = (token: string): { decoded: jwt.JwtPayload; tokenExpired: boolean } => {
    let tokenExpired = false;
    let decoded = {};

    try {
      decoded = jwt.verify(token, environment.JWT_SECRET);
    } catch (error) {
      Logger.getInstance().error(`Error verifying the token: ${error}`);
      if (error instanceof jwt.TokenExpiredError) {
        Logger.getInstance().error('Token expired');
        tokenExpired = true;
      } else {
        throw new ApiError(
          HttpStatusCode.internalServerError,
          Errors.INTERNAL_SERVER_ERROR,
          'An error occurred while verifying the token',
        );
      }
    }

    return { decoded, tokenExpired };
  };
}
