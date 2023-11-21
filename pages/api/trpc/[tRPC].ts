import {FetchCreateContextFnOptions, fetchRequestHandler,} from "@trpc/server/adapters/fetch";
import {appRouter} from "./rootRouter";

const handler = (request: Request) => {
    console.log(`incoming request ${request.url}`);
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: function (
            opts: FetchCreateContextFnOptions
        ): object | Promise<object> {
            return {};
        },
        onError({ error }) {

                console.error('Something went wrong', error);
        },
    });
};

export { handler as GET, handler as POST };
