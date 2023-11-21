import {initTRPC} from "@trpc/server";
import superJson from "superjson";

const t = initTRPC.create({
    transformer: superJson,
});
export const RpcRouter = t.router;
export const RpcPublicProcedure = t.procedure;

