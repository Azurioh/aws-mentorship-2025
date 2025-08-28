import { ProjectFields } from '@test-connect/shared/schemas/project';
import { z } from 'zod';
import { v4 } from 'uuid';
import zodToJsonSchema from 'zod-to-json-schema';
import { ProjectState } from '@test-connect/shared/enums/project';

export const Body = z.object({
  ...ProjectFields.name,
  ...ProjectFields.description,
  
  ...ProjectFields.dueDate,
  ...ProjectFields.category,
  ...ProjectFields.skills
});

export const BodyJson = zodToJsonSchema(Body) as never;

export type TBody = z.infer<typeof Body>;

export type TBodyJson = typeof BodyJson;

export const Params = z.object({}).passthrough();

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

export const Data = Body.and(
  z.object({
    ...ProjectFields.id,
    ...ProjectFields.ownerId,
    ...ProjectFields.createdAt,
    ...ProjectFields.updatedAt,
    ...ProjectFields.applicants,
    ...ProjectFields.state,
  }),
);

export type TData = z.infer<typeof Data>;

export const BodyToData = (body: TBody, ownerId: string): TData => {
  return Data.parse({
    ...body,
    id: v4(),
    ownerId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    applicants: 0,
    state: ProjectState.WAITING_TESTER
  });
};
