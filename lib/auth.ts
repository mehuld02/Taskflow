import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    // your providers (GitHub, Google, Credentials, etc.)
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub; // expose userId to client
      }
      return session;
    },
  },
};
