import type { AWS } from '@serverless/typescript';
import dotenv from 'dotenv';
import dynamoTables from "./src/resources/dynamo-tables"

dotenv.config();

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
    environment:{
      PROJECTS_TABLE: process.env.PROJECTS_TABLE as string
    }
  },

  plugins: [
    'serverless-esbuild',
    'serverless-dotenv-plugin',
  ],

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
        { http: { path: '/', method: 'any' } },
        { http: { path: '/{proxy+}', method: 'any' } },
      ],
    },
  },

  resources: {
    Resources: { ...dynamoTables },
  },
};

module.exports = serverlessConfiguration;
