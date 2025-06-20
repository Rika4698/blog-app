"use client"
import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {  Home, Menu, X } from "lucide-react";
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
     const navOptions=<>
  <li className=""><Link href="/"
              onClick={() => setIsOpen(false)}
               className='flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'>
            <Home width={24} />Home</Link></li>
               
                    <li className=""><Link href='/admin/addProduct' onClick={() => setIsOpen(false)} className='flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'>
            <Image src={assets.add_icon} alt='' width={24} />Add Blogs
          </Link></li>

          

                    <li className=""><Link href='/admin/blogList' onClick={() => setIsOpen(false)} className='flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'>
            <Image src={assets.blog_icon} alt='' width={24} />Blog Lists
          </Link></li>

                    <li className=""> <Link href='/admin/subscription' onClick={() => setIsOpen(false)} className='flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'>
            <Image src={assets.email_icon} alt='' width={24} />Subscriptions
          </Link></li>
                    
                    
                    
                
  
                 </>
    return (
       <div>

        <div className=' '>
          <nav className="bg-white dark:bg-slate-800  w-full z-50 top-0 start-0   overscroll-x-none ">

            <div className=" flex  items-center justify-between mx-auto p-3 lg:p-0  ">
              <Link href='/' className='lg:hidden'>
              <Image src={assets.logo} width={120} alt='' />
              </Link>
               {isOpen && (
        <div
        className={`fixed top-0 left-0 w-full min-h-screen bg-black opacity-50 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      )}


      <div
        className={`fixed top-0 left-0 bottom-0 w-2/3 sm:w-1/2 bg-white dark:bg-gray-800 lg:h-screen
         min-[350px]:h-screen overflow-y-auto z-50 p-6  transition-transform duration-300  ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }  `}
      >
        <div className="h-full overflow-y-auto ">
          <Image src={assets.logo} width={120} alt='' className=' lg:hidden' />
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-full   dark:bg-white text-gray-800 dark:text-gray-800 z-[100]"
          >
            <X size={25} />
          </button>

          <div className="p-3 pt-16 lg:hidden">
            {/* Dark mode toggle for mobile */}
            

            {/* Mobile Navigation Links */}
            <ul className="space-y-6 lg:hidden">
             {navOptions}
            </ul>
          </div>
        </div>
      </div>


      <div className='hidden lg:flex flex-col  bg-slate-100 '>
        <div className="pl-20 py-[18px] border-b border-black justify-center items-center">
          <Image src={assets.logo} width={120} alt='' />
        </div>

        <div className='h-auto min-h-screen  w-80 py-12 '>
        
        <ul className="px-7 space-y-6 ">
         {navOptions}
        </ul>
       
        </div>
      </div>


      <div className="flex items-center gap-x-3 btn max-[639px]:mx-2 sm:mx-6 md:mx-6    lg:hidden">
            <button onClick={() => setIsOpen(true)} className="lg:hidden ">
              <Menu size={25} />
            </button>
          </div>

            </div>

          </nav>

        </div>
      
     
    </div>
    );
};

export default Sidebar; 