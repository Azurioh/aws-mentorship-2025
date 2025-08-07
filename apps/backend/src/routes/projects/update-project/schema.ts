import { ProjectField, ProjectFields } from '@test-connect/shared/schemas/project';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const Body = z.object({
  ...ProjectFields.name,
  ...ProjectFields.description,
  ...ProjectFields.state,
  ...ProjectFields.dueDate,
});

export const BodyJson = zodToJsonSchema(Body) as never;

export type TBody = z.infer<typeof Body>;
export type TBodyJson = typeof BodyJson;

export const Params = z.object({
  projectId: ProjectField.id,
});

export const ParamsJson = zodToJsonSchema(Params) as never;

export type TParams = z.infer<typeof Params>;
export type TParamsJson = typeof ParamsJson;

export const Headers = z.object({}).passthrough();

export const HeadersJson = zodToJsonSchema(Headers) as never;

export type THeaders = z.infer<typeof Headers>;
export type THeadersJson = typeof HeadersJson;

export const Querystring = z.object({}).passthrough();

export const QuerystringJson = zodToJsonSchema(Querystring) as never;

export type TQuerystring = z.infer<typeof Querystring>;
export type TQuerystringJson = typeof QuerystringJson;
