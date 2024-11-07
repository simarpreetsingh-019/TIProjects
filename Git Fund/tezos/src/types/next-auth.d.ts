import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        expires: string;
        user: {
            address: string
        } & DefaultSession["user"];
    }
}