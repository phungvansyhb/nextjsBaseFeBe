import {SessionProvider, useSession} from "next-auth/react";
import Loading from "../components/common/Loading";

export function NextAuth({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Auth>{children}</Auth>
    </SessionProvider>
  );
}

function Auth({ children }: { children: React.ReactNode }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return children;
}
