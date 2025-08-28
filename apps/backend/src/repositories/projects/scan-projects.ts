import type { ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import type { TProject } from '@test-connect/shared/schemas/project';
import ApiError from '@utils/api-error';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';

export const scanProjects = async (): Promise<TProject[]> => {
  const params: ScanCommandInput = {
    TableName: tableSelector(environment.PROJECTS_TABLE),
  };

  try {
    const result = await dynamoServiceInstance.scan(params);
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
