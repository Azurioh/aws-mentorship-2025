import { NotificationField } from '@test-connect/shared/schemas/notification';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const Params = z.object({
  notificationId: NotificationField.id,
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
