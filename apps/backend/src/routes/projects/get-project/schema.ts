import { ProjectField } from '@test-connect/shared/schemas/project';
import type { FromSchema } from 'json-schema-to-ts';
import { z } from 'zod';

export const Params = z.object({
  projectId: ProjectField.id,
});

export type TParams = z.infer<typeof Params>;

export const Headers = {};

export type THeaders = FromSchema<typeof Headers>;

export const Querystring = {};

export type TQuerystring = FromSchema<typeof Querystring>;
