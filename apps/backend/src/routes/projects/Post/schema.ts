import type { FromSchema } from 'json-schema-to-ts';
import { ProjectFields } from '@test-connect/shared/schemas/project';
import { z } from 'zod';
import { v4 } from 'uuid';

export const Body = z.object({
  ...ProjectFields.name,
  ...ProjectFields.description,
  ...ProjectFields.state,
  ...ProjectFields.budget,
  ...ProjectFields.duration,
  ...ProjectFields.developerUserId,
});

export type TBody = z.infer<typeof Body>;

export const Params = {};

export type TParams = FromSchema<typeof Params>;

export const Headers = {};

export type THeaders = FromSchema<typeof Headers>;

export const Querystring = {};

export type TQuerystring = FromSchema<typeof Querystring>;

export const Data = Body.and(
  z.object({
    ...ProjectFields.id,
    ...ProjectFields.createdAt,
    ...ProjectFields.updatedAt,
  }),
);

export type TData = z.infer<typeof Data>;

export const BodyToData = (body: TBody): TData => {
  return Data.parse({
    ...body,
    id: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};
