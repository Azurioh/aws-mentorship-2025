import { environment } from '@config/environment';
import type { TData } from './schema';
import type { PutCommandInput } from '@aws-sdk/lib-dynamodb';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import { Errors } from '@test-connect/shared/enums/errors';
import ApiError from '@utils/api-error';

export const createProject = async (data: TData) => {
  try {
    const input: PutCommandInput = {
      TableName: tableSelector(environment.PROJECTS_TABLE),
      Item: data,
    };

    console.log(tableSelector(environment.PROJECTS_TABLE));

    return dynamoServiceInstance.create(input);
  } catch (error) {
    console.error(error);
    throw new ApiError(
      HttpStatusCode.internalServerError,
      Errors.INTERNAL_SERVER_ERROR,
      'An error occured while creating the project',
    );
  }
};
