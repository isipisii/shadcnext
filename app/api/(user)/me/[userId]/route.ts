import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDb";
import bcrypt from "bcrypt"
import User from "@/models/user.model";
import { getServerSession } from "next-auth";

interface IParams {
    userId: string
}

// try protected api using server session
export const GET = async (req: NextRequest, { params }: { params: IParams } ) => {    

    try {
        await connectDB();

        const session = await getServerSession();

        if(!params.userId) console.log("Missing params")

        if(!session){
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 400 })
        }
    
        const user = await User.findById(params.userId);

        if (!user) {
          return NextResponse.json(
            { success: false, message: "User not found" },
            { status: 404 }
          );
        }
    
        return NextResponse.json({
          success: true,
          user
        }, { status: 200 })

      } catch (error) {
        return NextResponse.json({
          success: false,
          message: "Internal server error",
        }, { status: 500 })
      }
}