import { ConnectDB } from "@/lib/config/db"
import {  NextResponse } from "next/server";
import {writeFile} from 'fs/promises'
import BlogModel from "@/lib/models/BlogModel";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();


export async function GET(request){
    
    return NextResponse.json({msg:"API Working"})
};

export async function POST(request){

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const authorImg = formData.get("authorImg");

    const imageByteData = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageByteData);
    const imagePath = `./public/${timestamp}_${image.name}`;
    await writeFile(imagePath,imageBuffer);
    const imgUrl =`/${timestamp}_${image.name}`;

    const authorBuffer = Buffer.from(await authorImg.arrayBuffer());
    const authorPath = `./public/${timestamp}_author_${authorImg.name}`;
    await writeFile(authorPath, authorBuffer);
    const authorImgUrl = `/${timestamp}_author_${authorImg.name}`;

    const steps = [
        {
          title:`${formData.get('stepTitle1')}`,
          description:`${formData.get('stepDesc1')}`
        },
        {
          title:`${formData.get('stepTitle2')}`,
          description:`${formData.get('stepDesc2')}`
        },
        {
          title:`${formData.get('stepTitle3')}`,
          description:`${formData.get('stepDesc3')}`
        }
      ];

const blogData = {
    title:`${formData.get('title')}`,
    description:`${formData.get('description')}`,
    steps: steps,
    conclusion:`${formData.get('conclusion')}`,
    category:`${formData.get('category')}`,
    author:`${formData.get('author')}`,
    image:imgUrl,
    authorImg:authorImgUrl
};

await BlogModel.create(blogData);
console.log("Blog Saved");

return NextResponse.json({success:true, msg:"Blog Added"});
}

