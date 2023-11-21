import {inferRouterInputs, inferRouterOutputs} from "@trpc/server";
import {AppRouter} from "@/pages/api/trpc/rootRouter";

export type BASE_ERROR = {
    status : string ,
    message : string
}
export type BASE_RESPONSE<T> = {
    status : string ,
    data : T
}
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>