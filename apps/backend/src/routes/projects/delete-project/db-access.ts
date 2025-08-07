import type { DeleteCommandInput, DeleteCommandOutput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import ApiError from '@utils/api-error';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';

export const deleteProject = async (projectId: string): Promise<DeleteCommandOutput> => {
  const gsiParams: QueryCommandInput = {
    TableName: tableSelector(environment.PROJECTS_TABLE),
    IndexName: 'ProjectIdIndex',
    KeyConditionExpression: 'id = :projectId',
    ExpressionAttributeValues: {
      ':projectId': projectId,
    },
  };

  const projectResult = await dynamoServiceInstance.query(gsiParams);

  if (!projectResult.Items || projectResult.Items.length === 0) {
    throw new ApiError(HttpStatusCode.notFound, Errors.RESOURCE_NOT_FOUND, 'Project not found');
  }

  const project = projectResult.Items[0];
  const ownerId = project.ownerId;
  const params: DeleteCommandInput = {
    TableName: tableSelector(environment.PROJECTS_TABLE),
    Key: { ownerId, id: projectId },
  };

  try {
    return await dynamoServiceInstance.delete(params);
  } catch (error) {
    console.error(error);
    throw new ApiError(
      HttpStatusCode.internalServerError,
      Errors.INTERNAL_SERVER_ERROR,
      'An error occured while deleting the project',
    );
  }
};
