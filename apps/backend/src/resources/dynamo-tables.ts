export default {
  ProjectsTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:provider.environment.PROJECTS_TABLE}-${self:provider.stage}',
      AttributeDefinitions: [
        { AttributeName: 'ownerId', AttributeType: 'S' },
        { AttributeName: 'id', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'ownerId', KeyType: 'HASH' },
        { AttributeName: 'id', KeyType: 'RANGE' },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'ProjectIdIndex',
          KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    },
  },
  NotificationsTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:provider.environment.NOTIFICATIONS_TABLE}-${self:provider.stage}',
      AttributeDefinitions: [
        { AttributeName: 'userId', AttributeType: 'S' },
        { AttributeName: 'id', AttributeType: 'S' },
      ],
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'UserIdIndex',
          KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
          Projection: { ProjectionType: 'ALL' },
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    },
  },
};
