import type { UpdateCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import ApiError from '@utils/api-error';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';

export const readAllNotifications = async (userId: string) => {
  try {
    const queryParams: QueryCommandInput = {
      TableName: tableSelector(environment.NOTIFICATIONS_TABLE),
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };

    const queryResult = await dynamoServiceInstance.query(queryParams);

    if (!queryResult.Items || queryResult.Items.length === 0) {
      return;
    }

    const updatePromises = queryResult.Items.map((notification) => {
      const updateParams: UpdateCommandInput = {
        TableName: tableSelector(environment.NOTIFICATIONS_TABLE),
        Key: { id: notification.id },
        UpdateExpression: 'set #read = :read',
        ExpressionAttributeNames: {
          '#read': 'read',
        },
        ExpressionAttributeValues: {
          ':read': true,
        },
      };

      return dynamoServiceInstance.update(updateParams);
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error(error);
    throw new ApiError(
      HttpStatusCode.internalServerError,
      Errors.INTERNAL_SERVER_ERROR,
      'An error occured while reading all notifications',
    );
  }
};
