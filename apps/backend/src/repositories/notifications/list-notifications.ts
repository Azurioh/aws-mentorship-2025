import type { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import type { TNotification } from '@test-connect/shared/schemas/notification';
import ApiError from '@utils/api-error';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';

export const listNotifications = async (userId: string): Promise<TNotification[]> => {
  const params: QueryCommandInput = {
    TableName: tableSelector(environment.NOTIFICATIONS_TABLE),
    IndexName: 'UserIdIndex',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
    ScanIndexForward: false,
  };

  try {
    const result = await dynamoServiceInstance.query(params);
    return result.Items as unknown as TNotification[];
  } catch (error) {
    console.error(error);
    throw new ApiError(
      HttpStatusCode.internalServerError,
      Errors.INTERNAL_SERVER_ERROR,
      'An error occured while listing the notifications',
    );
  }
};
