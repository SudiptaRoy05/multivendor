import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import { loginUser } from "./app/action/auth/loginUser"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log("HELLO", credentials)
                
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const email = credentials.email as string
                const password = credentials.password as string

                if (typeof email !== 'string' || typeof password !== 'string') {
                    return null
                }
                try {
                    const user = await loginUser({
                        email,
                        password,
                    })
                    console.log(user)

                    if (!user) {
                        return null
                    }
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    }
                } catch (error) {
                    console.error('Authentication error:', error)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    }
})
