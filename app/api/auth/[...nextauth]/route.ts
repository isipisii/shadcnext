import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "@/lib/connectDb"
import User from "@/models/user.model"
import bcrypt from "bcrypt"

interface ICredentials {
    email: string,
    passwrod: string
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string, password: string }

                try {
                    await connectDB();
                    const user = await User.findOne({ email });
        
                    if (!user) throw Error("Invalid credentials");
        
                    const didMatch = await bcrypt.compare(password, user.password);
                    if (!didMatch) throw Error("Invalid credentials");
        
                    return user;
                } catch (error) {
                    console.log(error);
                }
            },
        })
    ],
    callbacks: {
       jwt(params: any) {
            if(params.user){
                params.token.id = params.user.id
            }
            return params.token
       },
       session({ session, token }) {
           if(session.user) {
                (session.user as { id: string }).id = token.id as string
           }
           return session
       },
    }
}

const authHandler = NextAuth(authOptions)

export { authHandler as GET, authHandler as POST }