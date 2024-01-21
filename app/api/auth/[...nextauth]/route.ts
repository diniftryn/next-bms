import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/model/user.model";

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: { type: "password" }
      },
      async authorize(credentials, req) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials?.email });

        if (user) {
          const passwordCorrect = (await compare(credentials?.password || "", user.password)) || credentials?.password === user.password;
          console.log({ passwordCorrect });

          if (passwordCorrect) {
            return {
              id: user.id,
              email: user.email
            };
          }
        }
        return null;
      }
    })
  ]
});

export { handler as GET, handler as POST };
