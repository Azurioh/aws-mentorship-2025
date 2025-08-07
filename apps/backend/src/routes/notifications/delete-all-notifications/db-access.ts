import type { DeleteCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import ApiError from '@utils/api-error';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';

export const deleteAllNotifications = async (userId: string) => {
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

    const deletePromises = queryResult.Items.map((notification) => {
      const deleteParams: DeleteCommandInput = {
        TableName: tableSelector(environment.NOTIFICATIONS_TABLE),
        Key: { id: notification.id },
      };

      return dynamoServiceInstance.delete(deleteParams);
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error(error);
    throw new ApiError(
      HttpStatusCode.internalServerError,
      Errors.INTERNAL_SERVER_ERROR,
      'An error occured while deleting all notifications',
    );
  }
};
