import type { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';
import { Errors } from '@test-connect/shared/enums/errors';
import { HttpStatusCode } from '@test-connect/shared/enums/http-status';
import type { TNotification } from '@test-connect/shared/schemas/notification';
import ApiError from '@utils/api-error';
import tableSelector from '@utils/table-selector';
import { dynamoServiceInstance } from 'src/services/dynamodb-service';

export const getNotification = async (notificationId: string): Promise<TNotification> => {
  const gsiParams: QueryCommandInput = {
    TableName: tableSelector(environment.NOTIFICATIONS_TABLE),
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': notificationId,
    },
  };

  const result = await dynamoServiceInstance.query(gsiParams);

  if (!result.Items || result.Items.length === 0) {
    throw new ApiError(HttpStatusCode.notFound, Errors.RESOURCE_NOT_FOUND, 'Notification not found');
  }

  return result.Items[0] as unknown as TNotification;
};
