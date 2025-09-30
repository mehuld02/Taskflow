import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // 👈 we extend with id
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
