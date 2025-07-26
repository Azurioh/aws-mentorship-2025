import { ProjectField } from '@test-connect/shared/schemas/project';
import { z } from 'zod';

export const Body = z.object({});

export type TBody = z.infer<typeof Body>;

export const Params = z.object({
  projectId: ProjectField.id,
});

export type TParams = z.infer<typeof Params>;

export const Headers = z.object({});

export type THeaders = z.infer<typeof Headers>;

export const Querystring = z.object({});

export type TQuerystring = z.infer<typeof Querystring>;
