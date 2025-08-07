import type { AWS } from '@serverless/typescript';
import dotenv from 'dotenv';
import dynamoTables from './src/resources/dynamo-tables';

dotenv.config();

const COGNITO_USER_POOL_ARN = 'arn:aws:cognito-idp:eu-west-3:892091699078:userpool/eu-west-3_sPpNlCgcL';

const serverlessConfiguration: AWS = {
  service: 'fastify-api',
  frameworkVersion: '3',

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'eu-west-3',
    memorySize: 256,
    timeout: 10,
    stage: 'prod',
    environment: {
      PROJECTS_TABLE: process.env.PROJECTS_TABLE as string,
      NOTIFICATIONS_TABLE: process.env.NOTIFICATIONS_TABLE as string,
      AWS_KEY: process.env.AWS_KEY as string,
      AWS_SECRET: process.env.AWS_SECRET as string,
      REGION: process.env.REGION as string,
      STAGE: process.env.STAGE as string,
    },
  },

  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],

  custom: {
    esbuild: {
      bundle: true,
      external: ['aws-sdk'],
      packager: 'npm',
    },
  },

  functions: {
    api: {
      handler: 'src/handler.main',
      events: [
        {
          http: {
            path: '/',
            method: 'any',
            cors: true,
          },
        },
        {
          http: {
            path: '/{proxy+}',
            method: 'any',
            cors: true,
            // authorizer: {
            //   type: 'COGNITO_USER_POOLS',
            //   authorizerId: { Ref: 'ApiGatewayAuthorizer' },
            // },
          },
        },
      ],
    },
  },

  resources: {
    Resources: {
      ...dynamoTables,

      ApiGatewayAuthorizer: {
        Type: 'AWS::ApiGateway::Authorizer',
        Properties: {
          Name: 'CognitoAuthorizer',
          Type: 'COGNITO_USER_POOLS',
          IdentitySource: 'method.request.header.Authorization',
          RestApiId: {
            Ref: 'ApiGatewayRestApi',
          },
          ProviderARNs: [COGNITO_USER_POOL_ARN],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
