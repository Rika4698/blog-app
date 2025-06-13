import { ConnectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";




export async function POST(req){
    await ConnectDB();
    const {email,password} = await req.json();

    try{

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"Invalid credentials"}, {status:401});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return NextResponse.json({error:"Invalid credentials"}, {status:401});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const response = NextResponse.json ({message:"Login Successful"});
        response.cookies.set('token',token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path:'/',

        });

        return response;

    } catch(error){
        return NextResponse.json({error:error.message}, {status:500});
    }
}