'use client'
import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSession, signOut } from "next-auth/react";
import Footer from '@/Components/Footer';

import BlogItem from '../../Components/BlogItem';
import { useGetBlogsQuery } from '../../store/blogAPI';

const page = () => {
   const { data: session, status } = useSession();
  const user = session?.user;

  const [menu, setMenu] = useState('All');
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { data, error, isLoading } = useGetBlogsQuery();
  const blogs = data?.blogs || [];

  // Toggle dropdown
  const handleOutsideClick = (event) => {
    if (!event.target.closest('#dropdownMenu')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    toast.success('Logout Successfully');
  };

  // Filter logic
  const filterBlog = (text) => {
    if (!blogs) return;
    const filter = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(text.toLowerCase()) ||
      blog.category.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filter);
  };

  useEffect(() => {
    if (!isLoading && blogs) {
      filterBlog(searchText);
    }
  }, [searchText, blogs, isLoading]);

  const handleSearch = () => {
    filterBlog(searchText);
  };

  if (isLoading) return <p className="text-center mt-10">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load blogs</p>;
  


return (
    <div>
        <div className='py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href="/">
                    <Image
                        src={assets.logo}
                        width={180} alt='Logo' className='w-[130px] sm:w-[150px]' />
                </Link>
                {status === "loading" ? (<div>Loading...</div>) : !session ? (<Link href={"/login"}
                    className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'
                >
                    Get Started <Image src={assets.arrow} alt='Arrow' />
                </Link>
                ) : (
                    <div className='flex items-center gap-4'>


                        <button
                            type="button"
                            className=" flex text-sm bg-gray-800 rounded-full focus:ring-4 transition-transform duration-300 hover:scale-110 focus:ring-gray-300   dark:focus:ring-gray-600"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDropdownOpen((prev) => !prev);
                            }}
                        >
                            <span className="sr-only">Open user menu</span> {user.image && (
                                <Image
                                    className="btn-circle w-12 h-12 lg:w-14 lg:h-14 rounded-full ring-2 ring-gray-300 "
                                    src={user.image}
                                    width={40}
                                    height={40}
                                    alt='User Avatar'
                                />)}
                        </button>
                        {/* User Dropdown Menu */}
                        {isDropdownOpen && (
                            <div id="dropdownMenu" className="z-50 absolute right-4 top-[88px]   bg-white divide-y divide-gray-100 rounded-lg shadow-lg shadow-slate-600 drop-shadow-lg dark:bg-gray-700 dark:divide-gray-200">
                                <div className="px-4 py-3 ">
                                    <span className="block text-base xl:text-lg font-bold text-gray-900 dark:text-white">
                                        {user.name}
                                    </span>
                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400 ">
                                        {user.email}
                                    </span>
                                </div>

                                <ul className="  ">
                                    {<><li className="group border-b border-gray-100 py-5 px-3 text-center  relative "> <Link href={'/admin/addProduct'} className=' text-center border border-black  font-medium px-7 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-5px] hover:translate-y-[5px] transition-all'>
                                        Blog Panel

                                    </Link></li> </>}


                                    <li className="py-3 px-16">
                                        <button onClick={handleLogout} className="rounded-lg text-white bg-red-500    lg:w-28 lg:h-10 w-24 h-10 "  >
                                         
                                            <span className="ml-2 text-base">Logout</span></button>
                                    </li>

                                </ul>
                            </div>)}
                    </div>)}
            </div>

<div className='text-center my-8'>
            <h1 className='text-3xl sm:text-5xl font medium'>All Blogs</h1>
            
            <div className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]' >

                <input   type="text" placeholder="Search by title, category"
        value={searchText}
        onChange={e => setSearchText(e.target.value)} className='pl-4 outline-none' />
                <button onSubmit={handleSearch}  className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Search</button>

            </div>
            </div>


            <div className='flex justify-center gap-6 my-12'>
                        {['All', 'Technology', 'Startup', 'Lifestyle'].map((cate) => ( <button key={cate} onClick={() => setMenu(cate)} className={menu === cate ? "bg-black text-white py-1 px-4 rounded-sm":""}>{cate}</button>
                        ))}
                      
                        </div> 
            
                        <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                        {filtered.filter((item)=> menu ==='All'?true:item.category===menu).map((item,index)=>{
                return  <BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category}/>
})}
                        </div>
            
                  

           
        </div>
         <Footer />
        </div>
    );
};

export default page;