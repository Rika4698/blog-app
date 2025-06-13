import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { ConnectDB } from "@/lib/config/db";
import User from "@/lib/models/User";

export const authOptions = {
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            await ConnectDB();
      
            const user = await User.findOne({ email: credentials.email });
            if (!user) throw new Error("No user found");
      
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) throw new Error("Invalid password");
      
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              image: user.image,
              
            };
          },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),

          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
      ],

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
