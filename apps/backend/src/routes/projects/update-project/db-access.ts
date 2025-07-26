import type { UpdateCommandInput, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import type { TBody } from './schema';
import { environment } from '@config/environment';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';
import ApiError from '@utils/api-error';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import { Errors } from '@test-connect/shared/enums/errors';

export const updateProject = async (projectId: string, data: TBody): Promise<UpdateCommandOutput> => {
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
  expressionAttributeNames['#id'] = 'id';

  const params: UpdateCommandInput = {
    TableName: tableSelector(environment.PROJECTS_TABLE),
    Key: { id: projectId },
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
