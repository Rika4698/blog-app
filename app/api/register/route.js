import { ConnectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import cloudinary from "@/lib/utils/cloudinary";




export async function POST(req){
    await ConnectDB();

    const formData = await req.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const imageFile = formData.get('image');

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({error: "User already exists"}, {status:400});
        }

        let imageUrl = "";
        if(imageFile && typeof imageFile.arrayBuffer === 'function'){
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if(!allowedTypes.includes(imageFile.type)){
                return NextResponse.json({error:"Unsupported file type"}, {status:400});
            }

            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const uploadResult = await new Promise((resolve,reject)=>{
                cloudinary.uploader.upload_stream({folder:'users'},(err,result) => {
                    if(err) reject(err);
                    else resolve(result);

                }).end(buffer);
            });

            imageUrl = uploadResult.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password:hashedPassword,
            image: imageUrl,

        });

        await user.save();
        return NextResponse.json({message: "User registered successfully"});
    } catch(error){
        return NextResponse.json({error:error.message}, {status:500});
    }
}