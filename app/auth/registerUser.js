"use server";

import bcrypt from "bcryptjs";

import { writeFile } from "fs/promises";
import { ConnectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import cloudinary from "@/lib/utils/cloudinary";

export const registerUser = async (formData) => {
    await ConnectDB();
  
    const { name, email, password, image } = formData;
  
    // Convert image to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
  
    // Convert buffer to base64 string
    const base64Image = buffer.toString("base64");
    const dataUri = `data:${image.type};base64,${base64Image}`;
  
    // Upload to Cloudinary directly from memory
    const cloudinaryResult = await cloudinary.uploader.upload(dataUri, {
      folder: "nextauth_users",
    });
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: cloudinaryResult.secure_url,
    });
  
    await newUser.save();
  
    return { message: "User Registered" };
  };
  