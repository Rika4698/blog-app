'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
    

const page = () => {
      
    const [blogs,setBlogs] = useState([]);

    const fetchBlogs = async () =>{
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs)
    }

    const confirmDeleteBlog = (mongoId) => {
        toast(
          ({ closeToast }) => (
            <div>
              <p className="font-semibold">Are you sure you want to delete this blog?</p>
              <div className="flex gap-4 mt-3">
                <button
                  className="bg-red-600 text-white px-4 py-1 rounded"
                  onClick={() => deleteBlog(mongoId, closeToast)}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-1 rounded"
                  onClick={closeToast}
                >
                  No
                </button>
              </div>
            </div>
          ),
          {
            autoClose: false,
          }
        );
      };
    
    
    const deleteBlog = async (mongoId, closeToast) => {
        try {
        const response = await axios.delete('/api/blog',{
            params:{
                id:mongoId 
            }
        })

        toast.success(response.data.msg);
        fetchBlogs();
    } catch (error) {
        toast.error("Failed to delete the blog.");
      } finally {
        closeToast();
      }
    };
    
    useEffect(()=>{
        fetchBlogs();

    },[])


    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-12'>
            <h1>All blogs</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='hidden sm:block px-6 py-3'>
                                Author name
                            </th>
                            <th scope='col' className=' px-6 py-3'>
                                Blog Title
                            </th>
                            <th scope='col' className=' px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className=' px-6 py-3'>
                                Action
                            </th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            blogs.map((item,index)=>{
                               return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} confirmDeleteBlog={confirmDeleteBlog}/>
                            })
                        }
                       
                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default page;