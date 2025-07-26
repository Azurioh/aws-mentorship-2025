import type { GetCommandInput } from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import type { TProject } from '@test-connect/shared/schemas/project';
import ApiError from '@utils/api-error';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';

export const getProject = async (projectId: string): Promise<TProject> => {
  const params: GetCommandInput = {
    TableName: tableSelector(environment.PROJECTS_TABLE),
    Key: { id: projectId },
  };

  try {
    const result = await dynamoServiceInstance.get(params);

    return result as unknown as TProject;
  } catch (error) {
    console.error(error);
    throw new ApiError(
      HttpStatusCode.internalServerError,
      Errors.INTERNAL_SERVER_ERROR,
      'An error occured while getting the project',
    );
  }
};
