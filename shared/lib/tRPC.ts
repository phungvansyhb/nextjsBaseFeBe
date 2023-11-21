import {createTRPCReact} from "@trpc/react-query";
import {AppRouter} from "@/pages/api/trpc/rootRouter";

export const trpc = createTRPCReact<AppRouter>();

