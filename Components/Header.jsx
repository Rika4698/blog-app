import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSession, signOut } from "next-auth/react";

const Header = ({ searchQuery, setSearchQuery }) => {
    const { data: session, status } = useSession();
    const user = session?.user;
    const [email, setEmail] = useState('');

    const [isDropdownOpen, setDropdownOpen] =useState(false);
    const handleOutsideClick = (event)=>{
      if(!event.target.closest("#dropdownMenu")){
        setDropdownOpen(false);

      }
    };

    useEffect(()=>{
      if(isDropdownOpen){
        document.addEventListener('click',handleOutsideClick);

      }else{
        document.removeEventListener('click',handleOutsideClick);
      }
      return () => document.removeEventListener('click',handleOutsideClick);
    }, [isDropdownOpen]);


  const handleLogout = () => {
      signOut({ callbackUrl: "/" });
      toast.success("Logout Successfully");
    };

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("email",email);
        const response = await axios.post('/api/email',formData);
        if(response.data.success){
            toast.success(response.data.msg);
            setEmail('');
        }
        else{
            toast.error("Error");
        }
    }
    return (
        <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link href="/">
          <Image
            src={assets.logo}
            width={180}
            alt='Logo'
            className='w-[130px] sm:w-[150px]'
          />
        </Link>

        {status === "loading" ? (
          <div>Loading...</div>
        ) : !session ? (
          <Link
            href={"/login"}
            className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'
          >
            Get Started <Image src={assets.arrow} alt='Arrow' />
          </Link>
        ) : (
          <div className='flex items-center gap-4'>
           

         <button
                  type="button"
                  className=" flex text-sm bg-gray-800 rounded-full focus:ring-4 transition-transform duration-300 hover:scale-110 focus:ring-gray-300   dark:focus:ring-gray-600"
                  onClick={(e) => {e.stopPropagation();
                     setDropdownOpen((prev) => !prev);}}
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
              {
                       <><li className="group border-b border-gray-100 py-5 px-3 text-center  relative "> <Link href={'/admin/addProduct'} className=' text-center border border-black  font-medium px-7 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-5px] hover:translate-y-[5px] transition-all'>
                        Blog Panel

                    </Link></li> </>
                     }

                   
                   

<li className="py-3 px-16">
              <button onClick={handleLogout} className="rounded-lg text-white bg-red-500    lg:w-28 lg:h-10 w-24 h-10 "  >
                                {/* <BiLogOut className="  inline-flex text-xl   "></BiLogOut> */}
                                
                                <span className="ml-2 text-base">Logout</span></button>
                                </li>

              
              </ul>
            </div>
          )} 



          </div>


            
          
          


        )}
      </div>
  
            <div className='text-center my-8'>
            <h1 className='text-3xl sm:text-5xl font medium'>Latest Blogs</h1>
            <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Stay updated with our newest posts, fresh ideas, and trending topics. Dive into the latest articles curated just for you — straight from the minds of passionate writers.</p>
            <form onSubmit={(e) => {e.preventDefault(); }} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]' action="">

                <input type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search blog title or category" className='pl-4 outline-none' />
                <button type="submit" className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Search</button>

            </form>
            </div>
        </div>
    );
};

export default Header;