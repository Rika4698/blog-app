import mongoose from 'mongoose';

export const ConnectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to MongoDB");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if connection fails
  }
};

//import mongoose from'mongoose';

// export const ConnectDB = async () =>{
//     await mongoose.connect("mongodb+srv://rika_46:WjCHl4cMgUO5ufl0@cluster0.c4ncpak.mongodb.net/blog-app");
//     console.log("DB Connected");

// }