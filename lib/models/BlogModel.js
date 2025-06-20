import mongoose from "mongoose";
const stepSchema = new mongoose.Schema({
    title:{
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true 
    },
    steps: {
        type: [stepSchema], // Array of stepSchema
        required: true,
      },
    conclusion:{
        type:String,
        required:true 
    },
    category:{
        type:String,
        required:true 
    },
    author:{
        type:String,
        required:true 
    },
    image:{
        type:String,
        required:true 
    },
    authorImg:{
        type:String,
        required:true 
    },
    userEmail:{
        type:String,
        required:true 
    },
  userImage: {
        type:String,
        required:true 
    },
    date:{
        type:Date,
        default:Date.now()
    },

})

const BlogModel = mongoose.models.blog || mongoose.model('blog',Schema);
export default BlogModel;