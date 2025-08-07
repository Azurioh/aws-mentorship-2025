import type { UpdateCommandInput, UpdateCommandOutput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import type { TBody } from './schema';
import { environment } from '@config/environment';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';
import ApiError from '@utils/api-error';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import { Errors } from '@test-connect/shared/enums/errors';

export const updateProject = async (projectId: string, data: TBody): Promise<UpdateCommandOutput> => {
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
  const updateExpression: string[] = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, unknown> = {};

  Object.entries(data).forEach(([fieldName, value], index) => {
    const attributeName = `#field${index}`;
    const attributeValue = `:value${index}`;

    if (!value || fieldName === 'id') {
      return;
    }

    expressionAttributeNames[attributeName] = fieldName;
    updateExpression.push(`${attributeName} = ${attributeValue}`);
    expressionAttributeValues[attributeValue] = value as unknown;
  });

  const params: UpdateCommandInput = {
    TableName: tableSelector(environment.PROJECTS_TABLE),
    Key: { ownerId, id: projectId },
    UpdateExpression: `SET ${updateExpression.join(', ')}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ConditionExpression: 'attribute_exists(id)',
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    return await dynamoServiceInstance.update(params);
  } catch (error) {
    console.error(error);
    throw new ApiError(
      HttpStatusCode.internalServerError,
      Errors.INTERNAL_SERVER_ERROR,
      'An error occured while updating the project',
    );
  }
};
