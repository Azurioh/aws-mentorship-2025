import type { FastifyReply, FastifyRequest } from "fastify";
import { TBody, THeaders, TParams, TQuerystring } from "./schema";

const handler = async (
    req: FastifyRequest<{
        Body: TBody;
        Headers: THeaders;
        Params: TParams;
        Querystring: TQuerystring;
    }>,
    res: FastifyReply
) => {
    return res.status(200).send({ msg: "yes" });
};

export default handler;
