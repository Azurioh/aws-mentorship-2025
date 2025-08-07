import type { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import type { TProject } from '@test-connect/shared/schemas/project';
import ApiError from '@utils/api-error';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';

export const listProjects = async (ownerId: string): Promise<TProject[]> => {
  const params: QueryCommandInput = {
    TableName: tableSelector(environment.PROJECTS_TABLE),
    KeyConditionExpression: 'ownerId = :ownerId',
    ExpressionAttributeValues: {
      ':ownerId': ownerId,
    },
    ScanIndexForward: false,
  };

  try {
    const result = await dynamoServiceInstance.query(params);
    return result.Items as unknown as TProject[];
  } catch (error) {
    console.error(error);
    throw new ApiError(
      HttpStatusCode.internalServerError,
      Errors.INTERNAL_SERVER_ERROR,
      'An error occured while listing the projects',
    );
  }
};
