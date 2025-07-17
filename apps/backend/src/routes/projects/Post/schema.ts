import { FromSchema } from 'json-schema-to-ts';



export const Body = {
    type: "object" as const,
    properties: {
        name: { type: "string" as const },
    },
    required: ["name"],
} as const;

export type TBody = FromSchema<typeof Body>

export const Params = {}

export type TParams = FromSchema<typeof Params>


export const Headers = {}

export type THeaders = FromSchema<typeof Headers>
 

export const Querystring = {}

export type TQuerystring = FromSchema<typeof Querystring>
