'use client'
import { assets } from '@/Assets/assets';

import Image from 'next/image';
import { use } from 'react';
import {  useRouter } from 'next/navigation';
import { useUpdateBlogMutation, useGetBlogsQuery } from '../../../../store/blogAPI';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import { generateGeminiField } from '../../../../lib/utils/geminiHelpers';

const page = ({params}) => {
       
     
  const { id } = use(params);
    const router = useRouter();
    const { data: session } = useSession();
     const { data: blog, isLoading, isError } = useGetBlogsQuery(id);
  const [updateBlog] = useUpdateBlogMutation();


    const [data, setData] = useState({
      title: '',
      description: '',
      stepTitle1: '',
      stepDesc1: '',
      stepTitle2: '',
      stepDesc2: '',
      stepTitle3: '',
      stepDesc3: '',
      conclusion: '',
      category: 'Startup',
      author: '',
    });
    const [image, setImage] = useState(null);
    const [authorImg, setAuthorImg] = useState(null);
    const [prevImageUrl, setPrevImageUrl] = useState('');
    const [prevAuthorImgUrl, setPrevAuthorImgUrl] = useState('');
    const [topic, setTopic] = useState('');
    // const [loading, setLoading] = useState(true);
    
     // When blog data is fetched, set form values
  useEffect(() => {
    if (blog) {
      setData({
        title: blog.title || "",
        description: blog.description || "",
        stepTitle1: blog.steps[0]?.title || '',
        stepDesc1: blog.steps[0]?.description || '',
        stepTitle2: blog.steps[1]?.title || '',
        stepDesc2: blog.steps[1]?.description || '',
        stepTitle3: blog.steps[2]?.title || '',
        stepDesc3: blog.steps[2]?.description || '',
        conclusion: blog.conclusion || "",
        category: blog.category || "Startup",
        author: blog.author || "",
      });
      setPrevImageUrl(blog.image);
      setPrevAuthorImgUrl(blog.authorImg);
      setTopic(blog.title || ""); // example to set topic initially
      // For images, you may want to store URLs instead of File objects
      // You can implement accordingly if needed
    }
  }, [blog]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (type) => {
    if (!topic) return toast.error("Please enter a topic first!");
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
    formData.append('id', id);
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
    if(authorImg) formData.append('authorImg', authorImg);
    if(image) formData.append('image', image);

    try {
      await updateBlog(formData).unwrap();
      toast.success("Blog updated successfully!");
      router.push('/admin/blogList'); // Redirect after update, adjust path
    } catch (err) {
      console.error(err);
      toast.error("Failed to update blog");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading blog.</p>;



  



    return (
      <>
      <h3 className="text-center text-4xl mt-4 font-semibold">Update Blog</h3>
      <div className="flex justify-center items-center mt-7">
       {data? data && ( <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16 w-full max-w-2xl'>
           <p className="text-xl">Blog Topic <span className="text-blue-700">(for AI)</span></p>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
            placeholder="E.g. How to Start a Business"
          />
      <p className='text-xl mt-5'>Upload thumbnail</p>
      <label htmlFor="image" className="inline-block w-fit">
        <Image
          className='mt-4 cursor-pointer'
          src={image ? URL.createObjectURL(image) : prevImageUrl || assets.upload_area}
          width={140}
          height={70}
          alt=''
        />
      </label>
      <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />


     <div className="mt-4">
            <p className="text-xl">Blog Title</p>
            <div className="flex gap-2">
              <input
                name="title"
                value={data.title}
                onChange={onChangeHandler}
                className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
                placeholder="Enter title"
                required
              />
              <button type="button" onClick={() => handleGenerate("title")} className="h-10 w-10 rounded-full bg-blue-600 text-white text-lg cursor-pointer">
                AI
              </button>
            </div>
          </div>




      <div className="mt-4">
            <p className="text-xl">Blog Description</p>
            <div className="flex gap-2">
              <textarea
                name="description"
                value={data.description}
                onChange={onChangeHandler}
                className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
                placeholder="Write short description"
                rows={4}
                required
              />
              <button type="button" onClick={() => handleGenerate("description")} className="rounded-full bg-blue-600 text-white text-lg cursor-pointer h-10 w-10">
                AI
              </button>
            </div>
          </div>



      {[1, 2, 3].map((i) => (
            <div key={i}>
              <p className="text-xl mt-4">Step {i} Title</p>
              <input
                name={`stepTitle${i}`}
                type="text"
                value={data[`stepTitle${i}`]}
                onChange={onChangeHandler}
                className="w-full sm:w-[500px] mt-4 px-4 py-2 border"
                placeholder={`Step ${i} Title`}
                required
              />
              <p className="text-xl mt-4">Step {i} Description</p>
              <textarea
                name={`stepDesc${i}`}
                type="text"
                value={data[`stepDesc${i}`]}
                onChange={onChangeHandler}
                className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
                rows={4}
                placeholder={`Step ${i} Description`}
                required
              />
            </div>
          ))}



      <div className="mt-4">
            <p className="text-xl">Blog Conclusion</p>
            <div className="flex gap-2">
              <textarea
                name="conclusion"
                value={data.conclusion}
                onChange={onChangeHandler}
                className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
                rows={4}
                placeholder="Write conclusion"
                required
              />
              <button type="button" onClick={() => handleGenerate("conclusion")} className="rounded-full bg-blue-600 text-white text-lg cursor-pointer h-10 w-10">
                AI
              </button>
            </div>
          </div>



      <p className="text-xl mt-4">Blog Category</p>
          <select
            name="category"
            onChange={onChangeHandler}
            value={data.category}
            className="w-40 mt-4 px-4 py-3 border text-gray-800"
          >
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>



      <p className="text-xl mt-4">Author name</p>
          <input
            name="author"
            onChange={onChangeHandler}
            value={data.author}
            className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
            type="text"
            placeholder="Type here"
            required
          />



      <p className='text-xl mt-4'>Author image</p>
      <label htmlFor="authorImg" className="inline-block w-fit">
        <Image
          className='mt-4 cursor-pointer'
          src={authorImg ? URL.createObjectURL(authorImg) : prevAuthorImgUrl || assets.upload_area}
          width={140}
          height={70}
          alt=''
        />
      </label>
      <input onChange={(e) => setAuthorImg(e.target.files[0])} type="file" id='authorImg' hidden />

      <br />
      <button type='submit' className='my-8 w-40 h-12 bg-black text-white'>UPDATE</button>
    </form>) : isLoading ? (
    <div className='flex justify-center items-center h-[80vh]'>
      <p className='text-xl animate-pulse'>Loading blog...</p>
    </div>
  ) :<></>}
</div>
    </>
    );
};

export default page;