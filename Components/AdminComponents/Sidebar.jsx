"use client"
import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {  Home, Menu } from "lucide-react";
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
       <>
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden p-4 border-b border-black flex justify-between items-center">
        <Image src={assets.logo} width={100} alt='' />
        <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
      </div>

      {/* Sidebar */}
      <div className={`lg:flex flex-col bg-slate-100 border border-black transition-all duration-300 
        ${isOpen ? "block" : "hidden"} lg:block w-full lg:w-80  lg:min-h-screen overflow-y-auto`}>
        
        <div className="px-4 lg:pl-14 py-4 border-b border-black">
          <Image src={assets.logo} width={120} alt='' />
        </div>

        <div className="flex flex-col space-y-4 p-4">
          <Link href='/' onClick={() => setIsOpen(false)} className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Home width={24} /><p>Home</p>
          </Link>
          <Link href='/admin/addProduct' onClick={() => setIsOpen(false)} className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src={assets.add_icon} alt='' width={24} /><p>Add Blogs</p>
          </Link>
          <Link href='/admin/blogList' onClick={() => setIsOpen(false)} className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src={assets.blog_icon} alt='' width={24} /><p>Blog Lists</p>
          </Link>
          <Link href='/admin/subscription' onClick={() => setIsOpen(false)} className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src={assets.email_icon} alt='' width={24} /><p>Subscriptions</p>
          </Link>
        </div>
      </div>
    </>
    );
};

export default Sidebar;