import { ProjectField } from '@test-connect/shared/schemas/project';
import type { FromSchema } from 'json-schema-to-ts';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const Params = z.object({
  projectId: ProjectField.id,
});

export const ParamsJson = zodToJsonSchema(Params) as never;

export type TParams = z.infer<typeof Params>;
export type TParamsJson = typeof ParamsJson;

export const Headers = {};

export type THeaders = FromSchema<typeof Headers>;

export const Querystring = {};

export type TQuerystring = FromSchema<typeof Querystring>;
