'use client'
import { assets } from '@/Assets/assets';

import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import { useCreateBlogMutation } from "../../../store/blogAPI";
import { generateGeminiField } from "../../../lib/utils/geminiHelpers";
const page = () => {
    const { data: session } = useSession();

console.log(session?.user?.email); // user's email
console.log(session?.user?.image); // user's profile imag

const [createBlog] = useCreateBlogMutation();
    const [image, setImage] = useState(false);
    const [authorImg, setAuthorImg] = useState(false);

    const [data, setData] = useState({
        title: "",
        description: "",
        stepTitle1: "",
        stepDesc1: "",
        stepTitle2: "",
        stepDesc2: "",
        stepTitle3: "",
        stepDesc3: "",
        conclusion: "",
        category: "Startup",
        author: ""

    })

    const[topic, setTopic] = useState('');

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
        console.log(data);
    }

   const handleGenerate = async (type) => {
  if (!topic)
    return toast.error("Please enter a topic first!");
  try {
    const result = await generateGeminiField(type, topic);
    setData((prev) => ({ ...prev, [type]: result }));
    toast.success(`${type} generated!`);
  } catch (err) {
    toast.error("Generation failed");
  }
};


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('stepTitle1', data.stepTitle1);
        formData.append('stepDesc1', data.stepDesc1);
        formData.append('stepTitle2', data.stepTitle2);
        formData.append('stepDesc2', data.stepDesc2);
        formData.append('stepTitle3', data.stepTitle3);
        formData.append('stepDesc3', data.stepDesc3);
        formData.append('conclusion', data.conclusion);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append("userEmail", session?.user?.email);
        formData.append("userImage", session?.user?.image);
        formData.append('authorImg', authorImg);
        formData.append('image', image);

        try{
            const res = await createBlog(formData).unwrap();
            toast.success("Blog created!");
             setImage(false);
            setAuthorImg(false);
            setData({
                title: "",
                description: "",
                stepTitle1: "",
                stepDesc1: "",
                stepTitle2: "",
                stepDesc2: "",
                stepTitle3: "",
                stepDesc3: "",
                conclusion: "",
                category: "Startup",
                author: ""
            });
            setTopic("");
        } catch(err){
            console.log(err);
            toast.error("Failed to create blog");
        }
    };

        
    
    return (
        <>
        
        <h3 className='text-center text-4xl mt-4  font-semibold '>Create Blog</h3>
        <div className='flex justify-center items-center mt-7'>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16  w-full max-w-2xl'>
                <p className="text-xl">Blog Topic <span className='text-blue-700'>(for AI)</span></p>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
        placeholder="E.g. How to Start a Business"
      />
                <p className='text-xl mt-4'>Upload thumbnail</p>
               <label htmlFor="image" className="inline-block w-fit">
  <Image
    className="mt-4 cursor-pointer"
    src={!image ? assets.upload_area : URL.createObjectURL(image)}
    width={140}
    height={70}
    alt=""
  />
</label>

<input
  onChange={(e) => setImage(e.target.files[0])}
  type="file"
  id="image"
  hidden
  required
/>

                  {/* Title */}
      <div className="mt-4">
        <p className="text-xl">Blog Title</p>
        <div className="flex gap-2 ">
          <input
            name="title"
            value={data.title}
            onChange={onChangeHandler}
            className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
            placeholder="Enter title" required
          />
          <button type="button" onClick={() => handleGenerate("title")} className="w-10 h-9  md:h-10 md:w-10 rounded-full bg-blue-600 text-white text-sm md:text-lg cursor-pointer ">
            AI
          </button>
        </div>
      </div>


       {/* Description */}
      <div className="mt-4">
        <p className="text-xl">Blog Description</p>
        <div className="flex gap-2">
          <textarea
            name="description"
            type="text" 
            value={data.description}
            onChange={onChangeHandler}
            className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
            placeholder="Write short description" 
            rows={4} required
          />
          <button type="button" onClick={() => handleGenerate("description")} className=" w-10 h-9  md:h-10 md:w-10 rounded-full bg-blue-600 text-white text-sm md:text-lg cursor-pointer">
            AI
          </button>
        </div>
      </div>

                {/* <p className='text-xl mt-4'>Blog Title</p>
                <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />

                <p className='text-xl mt-4'>Blog Description</p>
                <textarea name="description" onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Write content here' rows={5} required /> */}

  {[1, 2, 3].map((i) => (
        <div key={i}>
          <p className="text-xl mt-4">Step {i} Title</p>
          <input
            name={`stepTitle${i}`}
            type="text"
            value={data[`stepTitle${i}`]}
            onChange={onChangeHandler}
            className="w-full sm:w-[500px] mt-4 px-4 py-2 border"
            placeholder={`Step ${i} Title`} required
          />
          <p className="text-xl mt-4">Step {i} Description</p>
          <textarea
            name={`stepDesc${i}`}
            type="text"
            value={data[`stepDesc${i}`]}
            onChange={onChangeHandler}
            className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
            rows={4}
            placeholder={`Step ${i} Description`} required
          />
        </div>
      ))}
           

                  {/* Conclusion */}
      <div className="mt-4">
        <p className="text-xl">Blog Conclusion</p>
        <div className="flex gap-2">
          <textarea
            name="conclusion"
            type="text"
            value={data.conclusion}
            onChange={onChangeHandler}
            className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
            rows={4}
            placeholder="Write conclusion" required
          />
          <button type="button" onClick={() => handleGenerate("conclusion")} className="w-10 h-9  md:h-10 md:w-10 rounded-full bg-blue-600 text-white text-sm md:text-lg cursor-pointer">
            AI
          </button>
        </div>
      </div>

              

                <p className='text-xl mt-4'>Blog Category</p>
                <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-800'>
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>

                </select>
                <p className='text-xl mt-4'>Author name</p>
                <input name="author" onChange={onChangeHandler} value={data.author} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />


                <p className='text-xl mt-4'>Author image</p>
                <label htmlFor="authorImg" className='inline-block w-fit'>
                    <Image className='mt-4 cursor-pointer' src={!authorImg ? assets.upload_area : URL.createObjectURL(authorImg)} width={140} height={70} alt='' />
                </label>
                <input onChange={(e) => setAuthorImg(e.target.files[0])} type="file" id='authorImg' hidden required />
                <br />
                <button type='submit' className='my-8 w-40 h-12 bg-black text-white'>ADD</button>

            </form>
            </div>
        </>
    );
};

export default page;