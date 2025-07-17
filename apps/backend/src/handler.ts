import awsLambdaFastify from 'aws-lambda-fastify'
import build from '@core/app';
import { fastify } from 'fastify';

const app = build() as ReturnType<typeof fastify>;
export const main = awsLambdaFastify(app);
