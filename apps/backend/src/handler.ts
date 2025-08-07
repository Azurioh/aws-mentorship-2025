import build from '@core/app';
import awsLambdaFastify from 'aws-lambda-fastify';
import type { fastify } from 'fastify';

const app = build() as ReturnType<typeof fastify>;
const proxy = awsLambdaFastify(app, { binaryMimeTypes: [] }); // ajoute cette ligne
export const main = (event: any, context: any) => proxy(event, context);
