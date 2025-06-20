import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/action/auth/loginUser";

export interface LoginFormData {
  email: string;
  password: string;
}


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        return await loginUser({
          email: credentials.email,
          password: credentials.password,
        });
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
