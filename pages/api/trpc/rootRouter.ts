import {userRouter} from "../trpc/userRouter";
import { RpcRouter } from "./_initRpc";



export const appRouter = RpcRouter({
    user : userRouter,
});

export type AppRouter = typeof appRouter;

