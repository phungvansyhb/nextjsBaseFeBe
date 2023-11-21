import {DefaultJWT} from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    // type of User you want more
    role: string;
  }
  interface Session {
    user: User & {
      role: string;
      // id: string;
      // name: string;
    };
    token: {
      role: string;
      // id: string;
      // name: string;
      //type of Token of session you want more
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id:string,
    role: string;
  }
}
