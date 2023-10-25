import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "@/lib/connectDb"
import User from "@/models/user.model"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as TSigninCredentials

                try {
                    await connectDB();
                    const user = await User.findOne({ email }).select("+password");
                    if (!user) throw Error("Invalid credentials");
        
                    const didMatch = await bcrypt.compare(password, user.password);
                    if (!didMatch) throw Error("Invalid credentials");
        
                    return {
                        name: user.name,
                        email: user.email,
                        id: user._id
                    }
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        })
    ],
    callbacks: {
       jwt({ user, token }) {
            if(user){
                token.id = user.id
            }
            return token
       },
       session({ session, token }) {
           if(session.user) {
                (session.user as { id: string }).id = token.id as string
           }
           return session
       },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const authHandler = NextAuth(authOptions)

export { authHandler as GET, authHandler as POST }