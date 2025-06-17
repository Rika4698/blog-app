'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem';

import React from 'react';
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import { useGetBlogsQuery } from '../../../store/blogAPI';
import { useDeleteBlogMutation } from '../../../store/blogAPI';
    

const page = () => {
      
    
     const { data: session } = useSession();
    const { data, error, isLoading } = useGetBlogsQuery();
    const [deleteBlogRequest] = useDeleteBlogMutation();

    // console.log("✅ Raw Data from API:", data);
    // console.log("🧑 Logged-in User Email:", session?.user?.email);

    if (isLoading) return <p className='text-center mt-10'>Loading blogs....</p>;
    if (error) return <p className='text-center text-red-500'>Failed to load blogs</p>;

    // ✅ Support both object or array response
    const blogs = Array.isArray(data) ? data : data?.blogs || [];

    // ✅ Filter by current user's email (safe fallback)
    const filtered = session?.user?.email
        ? blogs?.filter(blog => blog?.userEmail === session.user.email)
        : [];

        console.log('data',blogs);


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
    const res = await deleteBlogRequest(mongoId).unwrap();
    toast.success(res.msg || "Blog deleted successfully");
  } catch (error) {
    toast.error("Failed to delete the blog.");
  } finally {
    closeToast();
  }
};
    
    
    // useEffect(()=>{ useDeleteBlogMutation
    //     fetchBlogs();

    // },[])


    return (
      <div>
        {filtered.length < 1 ? <h2 className="text-center text-xl text-gray-500 mt-6">No Blog Created</h2>:<>
        <h2 className='text-center text-2xl font-semibold'>My All Blogs</h2>
        <div className='flex-1 pt-5 px-3  sm:pl-12'>
            <h1>All blogs: {filtered.length}</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
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
                            <th>

                            </th>
                            
                        </tr>

                    </thead>
                    <tbody>
                        {
                            filtered.map((item,index)=>{
                               return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} confirmDeleteBlog={confirmDeleteBlog}/>
                            })
                        }
                       
                    </tbody>

                </table>

            </div>

        </div></>}
        </div>
    );
};

export default page;