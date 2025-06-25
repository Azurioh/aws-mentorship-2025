import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import { Errors } from '@test-connect/shared/enums/errors';
import ApiError from './api-error';

/**
 * @function handleThrow
 * @description Handle the throw of the error
 * @param error - The error to handle
 * @returns The error
 */
const handleThrowFunction = (error: unknown): void => {
  if (error instanceof ApiError) {
    throw error;
  }
  throw new ApiError(HttpStatusCode.internalServerError, Errors.INTERNAL_SERVER_ERROR, 'Internal server error');
};

/**
 * @function handleThrow
 * @description Handle the throw of the function
 * @param fn - The function to handle
 * @returns The result of the function
 */
const handleThrow = <T>(fn: () => Promise<T>): Promise<T> | undefined => {
  try {
    return fn();
  } catch (error) {
    handleThrowFunction(error);
  }
};

export default handleThrow;
