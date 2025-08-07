import type { UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import ApiError from '@utils/api-error';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';

export const readNotification = async (notificationId: string) => {
  const updateParams: UpdateCommandInput = {
    TableName: tableSelector(environment.NOTIFICATIONS_TABLE),
    Key: { id: notificationId },
    UpdateExpression: 'set #read = :read',
    ExpressionAttributeNames: {
      '#read': 'read',
    },
    ExpressionAttributeValues: {
      ':read': true,
    },
  };

  try {
    await dynamoServiceInstance.update(updateParams);
  } catch (error) {
    console.error(error);
    throw new ApiError(
      HttpStatusCode.internalServerError,
      Errors.INTERNAL_SERVER_ERROR,
      'An error occured while reading the notification',
    );
  }
};
