'use client';
import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import { useGetBlogsQuery } from '../store/blogAPI';

const Bloglist = () => {
    const [menu, setMenu]= useState("Technology");
    const{data, error, isLoading} = useGetBlogsQuery();
    
    if(isLoading)
        return <p className='text-center mt-10'>Loading blogs....</p>;

    if(error)
        return <p className='text-center text-red-500'>Failed to load blogs</p>;

    const blogs = data?.blogs || [];
   console.log(blogs);
    const filltered = blogs.filter(blog => blog.category === menu).slice(0, 4);

    // const fetchBlogs = async () =>{
    //     const response = await axios.get('/api/blog');
    //     setBlogs(response.data.blogs);
    //     console.log(response.data.blogs);
    // }
   
    // useEffect(() =>{
    //     fetchBlogs();
    // },[])

    return (
        <div>
          <div className='flex justify-center gap-6 my-10'>
            {['Technology', 'Startup', 'Lifestyle'].map((cate) => ( <button key={cate} onClick={() => setMenu(cate)} className={menu === cate ? "bg-black text-white py-1 px-4 rounded-sm":""}>{cate}</button>
            ))}
            {/* <button onClick={()=>setMenu("All")} className={menu==="All"?'bg-black text-white py-1 px-4 rounded-sm':""}>All</button>
            <button onClick={()=>setMenu("Technology")} className={menu==="Technology"?'bg-black text-white py-1 px-4 rounded-sm':""}>Technology</button>
            <button onClick={()=>setMenu("Startup")} className={menu==="Startup"?'bg-black text-white py-1 px-4 rounded-sm':""}>Startup</button>
            <button onClick={()=>setMenu("Lifestyle")} className={menu==="Lifestyle"?'bg-black text-white py-1 px-4 rounded-sm':""}>Lifestyle</button> */}
            </div> 

            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
            {filltered.map((item,index)=>  <BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category}/>
            )}
            </div>

            <div className="text-center">
        <a href="/all-blogs" className="text-blue-600">
          See All Blogs
        </a>
      </div>

        </div>
    );
};

export default Bloglist;