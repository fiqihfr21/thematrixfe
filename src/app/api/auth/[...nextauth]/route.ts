import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { AdapterUser } from "next-auth/adapters"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req): Promise<AdapterUser | null> => {
        const validateUser = await fetch(
          process.env.BASE_URL_API+'/api/auth/signin',
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const dataUser = await validateUser.json()

        if (!dataUser.success) {
          return null
        }

        return {
          ...dataUser.data,
          username: credentials?.username,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        }
      }

      return token
    },
    async session({ session, token }) {
      session.user = token

      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
