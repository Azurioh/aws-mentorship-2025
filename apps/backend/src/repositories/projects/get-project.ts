import type { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import type { TProject } from '@test-connect/shared/schemas/project';
import ApiError from '@utils/api-error';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';

export const getProject = async (projectId: string): Promise<TProject> => {
  const gsiParams: QueryCommandInput = {
    TableName: tableSelector(environment.PROJECTS_TABLE),
    IndexName: 'ProjectIdIndex',
    KeyConditionExpression: 'id = :projectId',
    ExpressionAttributeValues: {
      ':projectId': projectId,
    },
  };

  const result = await dynamoServiceInstance.query(gsiParams);

  if (!result.Items || result.Items.length === 0) {
    throw new ApiError(HttpStatusCode.notFound, Errors.RESOURCE_NOT_FOUND, 'Project not found');
  }

  return result.Items[0] as unknown as TProject;
};
