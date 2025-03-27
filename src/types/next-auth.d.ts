/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
  }
  interface Session {
    user: User & {
      /** The user's postal address. */
      email: string;
    };
    token: {
      email: string;
    };
  }
}
