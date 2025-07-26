import type { FromSchema } from 'json-schema-to-ts';

export const Params = {};

export type TParams = FromSchema<typeof Params>;

export const Headers = {};

export type THeaders = FromSchema<typeof Headers>;

export const Querystring = {};

export type TQuerystring = FromSchema<typeof Querystring>;
