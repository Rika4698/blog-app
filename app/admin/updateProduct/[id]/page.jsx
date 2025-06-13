'use client'
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const page = () => {
       
    const { id } = useParams();
    const router = useRouter();
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
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBlog = async () => {
        try {
          const res = await axios.get(`/api/blog?id=${id}`);
          const blog = res.data;
  
          setData({
            title: blog.title,
            description: blog.description,
            stepTitle1: blog.steps[0]?.title || '',
            stepDesc1: blog.steps[0]?.description || '',
            stepTitle2: blog.steps[1]?.title || '',
            stepDesc2: blog.steps[1]?.description || '',
            stepTitle3: blog.steps[2]?.title || '',
            stepDesc3: blog.steps[2]?.description || '',
            conclusion: blog.conclusion,
            category: blog.category,
            author: blog.author,
          });
  
          setPrevImageUrl(blog.image);
          setPrevAuthorImgUrl(blog.authorImg);
        } catch (err) {
          toast.error('Failed to fetch blog');
        }finally {
          setLoading(false); // stop loading
        }
      };
  
      fetchBlog();
      
    }, [id]);
  
    const onChangeHandler = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
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
      if (image) formData.append('image', image);
      if (authorImg) formData.append('authorImg', authorImg);
  
      try {
       await axios.put('/api/blog', formData);
   toast.success("Blog updated successfully!");
   setTimeout(() => {
    router.push('/admin/blogList');
  }, 1500);
  } catch (error) {
    console.error("Update failed", error);
   toast.error("Update failed");
  }
    };


    if (loading) {
      return (
        <div className='flex justify-center items-center h-[80vh]'>
          <p className='text-xl animate-pulse'>Loading blog...</p>
        </div>
      );
    }




    return (
      <>
       {data? data && ( <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
          <h1 className='text-center text-xl sm:text-3xl font-medium mb-4'>Update Blog</h1>
      <p className='text-xl'>Upload thumbnail</p>
      <label htmlFor="image">
        <Image
          className='mt-4'
          src={image ? URL.createObjectURL(image) : prevImageUrl || assets.upload_area}
          width={140}
          height={70}
          alt=''
        />
      </label>
      <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />

      <p className='text-xl mt-4'>Blog Title</p>
      <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />

      <p className='text-xl mt-4'>Blog Description</p>
      <textarea name="description" onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' rows={5} placeholder='Write content here' required />

      <p className='text-xl mt-4'>Description Step 1</p>
      <input name="stepTitle1" onChange={onChangeHandler} value={data.stepTitle1} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Step 1 Title' required />
      <textarea name="stepDesc1" onChange={onChangeHandler} value={data.stepDesc1} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' rows={4} placeholder='Step 1 Description' required />

      <p className='text-xl mt-4'>Description Step 2</p>
      <input name="stepTitle2" onChange={onChangeHandler} value={data.stepTitle2} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Step 2 Title' required />
      <textarea name="stepDesc2" onChange={onChangeHandler} value={data.stepDesc2} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' rows={4} placeholder='Step 2 Description' required />

      <p className='text-xl mt-4'>Description Step 3</p>
      <input name="stepTitle3" onChange={onChangeHandler} value={data.stepTitle3} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Step 3 Title' required />
      <textarea name="stepDesc3" onChange={onChangeHandler} value={data.stepDesc3} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' rows={4} placeholder='Step 3 Description' required />

      <p className='text-xl mt-4'>Blog Conclusion</p>
      <textarea name="conclusion" onChange={onChangeHandler} value={data.conclusion} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' rows={3} placeholder='Write content here' required />

      <p className='text-xl mt-4'>Blog Category</p>
      <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-800'>
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <p className='text-xl mt-4'>Author name</p>
      <input name="author" onChange={onChangeHandler} value={data.author} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />

      <p className='text-xl mt-4'>Author image</p>
      <label htmlFor="authorImg">
        <Image
          className='mt-4'
          src={authorImg ? URL.createObjectURL(authorImg) : prevAuthorImgUrl || assets.upload_area}
          width={140}
          height={70}
          alt=''
        />
      </label>
      <input onChange={(e) => setAuthorImg(e.target.files[0])} type="file" id='authorImg' hidden />

      <br />
      <button type='submit' className='my-8 w-40 h-12 bg-black text-white'>UPDATE</button>
    </form>) : loading ? (
    <div className='flex justify-center items-center h-[80vh]'>
      <p className='text-xl animate-pulse'>Loading blog...</p>
    </div>
  ) :<></>}
    </>
    );
};

export default page;