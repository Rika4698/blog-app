'use client'
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const page = () => {
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

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
        console.log(data);
    }

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
        formData.append('authorImg', authorImg);
        formData.append('image', image);

        const response = await axios.post('/api/blog', formData);
        if (response.data.success) {
            toast.success(response.data.msg);
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
        }
        else {
            toast.error("Error");
        }
    }
    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload thumbnail</p>
                <label htmlFor="image">
                    <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt='' />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />

                <p className='text-xl mt-4'>Blog Title</p>
                <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />

                <p className='text-xl mt-4'>Blog Description</p>
                <textarea name="description" onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Write content here' rows={5} required />

                <p className='text-xl mt-4'>Description Step 1</p>
                <input name="stepTitle1" onChange={onChangeHandler} value={data.stepTitle1} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Step 1 Title' required />
                <textarea name="stepDesc1" onChange={onChangeHandler} value={data.stepDesc1} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Step 1 Description' rows={4} required />

                <p className='text-xl mt-4'>Description Step 2</p>
                <input name="stepTitle2" onChange={onChangeHandler} value={data.stepTitle2} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Step 2 Title' required />
                <textarea name="stepDesc2" onChange={onChangeHandler} value={data.stepDesc2} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Step 2 Description' rows={4} required />

                <p className='text-xl mt-4'>Description Step 3</p>
                <input name="stepTitle3" onChange={onChangeHandler} value={data.stepTitle3} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Step 3 Title' required />
                <textarea name="stepDesc3" onChange={onChangeHandler} value={data.stepDesc3} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Step 3 Description' rows={4} required />

                <p className='text-xl mt-4'>Blog Conclusion</p>
                <textarea name="conclusion" onChange={onChangeHandler} value={data.conclusion} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Write content here' rows={3} required />

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
                    <Image className='mt-4' src={!authorImg ? assets.upload_area : URL.createObjectURL(authorImg)} width={140} height={70} alt='' />
                </label>
                <input onChange={(e) => setAuthorImg(e.target.files[0])} type="file" id='authorImg' hidden required />
                <br />
                <button type='submit' className='my-8 w-40 h-12 bg-black text-white'>ADD</button>

            </form>
        </>
    );
};

export default page;