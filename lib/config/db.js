import mongoose from'mongoose';

export const ConnectDB = async () =>{
    await mongoose.connect("mongodb+srv://rika_46:WjCHl4cMgUO5ufl0@cluster0.c4ncpak.mongodb.net/blog-app");
    console.log("DB Connected");

}