import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDb";
import bcrypt from "bcrypt"
import User from "@/models/user.model";

interface ISignUpCredentials {
    email: string
    password: string
    name: string
}

export const POST = async (req: NextRequest ) => {
    try {
        const body = await req.json() as ISignUpCredentials
        const { email, password } = body

        if(!email || !password) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Missing credentials",
            })
        }

        await connectDB();
    
        const user = await User.findOne({ email });
        if (user)
          return NextResponse.json({
            success: false,
            status: 400,
            message: "User already exists",
        })

        const hashedPwd = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPwd });
    
        return NextResponse.json({
          success: true,
          status: 201,
          message: "Account created",
        })

      } catch (error) {
        return NextResponse.json({
          success: false,
          status: 500,
          message: "Internal server error",
        })
      }
}