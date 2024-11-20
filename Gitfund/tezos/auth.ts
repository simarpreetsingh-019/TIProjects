import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub({
        profile(profile, tokens) {
            return {
                id: profile.id.toString(),
                name: profile.name ?? profile.login,
                email: profile.email,
                image: profile.avatar_url,
                role: tokens.role ?? 'user',
                username: profile.login // Add username from GitHub login
            }
        },
    })],
    callbacks: {
        jwt({ token, user, profile, account }) {
            if (user) token.user = user;
            if (profile) token.profile = profile;
            if (account) token.role = account.role;
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user = {
                    ...session.user,
                    username: (token.profile as any).login,
                    role: token.role as string,
                } as any;
            }
            return session;
        }
    }
});
