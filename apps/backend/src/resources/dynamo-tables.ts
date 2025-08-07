export default {
  ProjectsTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:provider.environment.PROJECTS_TABLE}-${self:provider.stage}',
      AttributeDefinitions: [
        { AttributeName: 'userId', AttributeType: 'S' },
        { AttributeName: 'id', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'userId', KeyType: 'HASH' },
        { AttributeName: 'id', KeyType: 'RANGE' },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    },
  },
};
