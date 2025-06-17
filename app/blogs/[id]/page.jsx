'use client'
import { assets } from '@/Assets/assets';
import Footer from '@/Components/Footer';

import Image from 'next/image';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import { useGetBlogsQuery } from '../../../store/blogAPI';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';




const page = () => {
   const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
   const user = session?.user;
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
 const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { data, error, isLoading } = useGetBlogsQuery(id, {
    skip: status !== 'authenticated' || !id,
  });


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
  // Redirect to login if user is unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      const currentPath = window.location.pathname;
      router.push(`/login?callbackUrl=${currentPath}`);
      
    }
  }, [status, router]);

  // Fetch blog data after session is authenticated
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/blog', {
  //         params: { id },
  //       });
  //       setData(response.data);
  //     } catch (err) {
  //       setError('Blog not found or error loading blog.');
  //     }
  //   };

  //   if (status === 'authenticated' && id) {
  //     fetchData();
  //   }
  // }, [status, id]);

  if (status === 'loading' || (status === 'authenticated' && isLoading)) {
    return <div className="text-center py-20 text-lg">Loading blog...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }


    return  <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href={'/'}>
                    <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-[150px]' /> </Link>
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
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>
                    {data?.title}

                </h1>
                <Image className='mx-auto mt-6  border border-white rounded-full w-14 h-14' src={data.authorImg} width={60} height={60} alt='' />
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>

        </div>
        <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
            <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='' />
            <h1 className='my-8 text-[26px] font-semibold '>Introduction:</h1>
            <p>{data.description}</p>

            {data?.steps.map((step, index) => (
                <div key={index}>
                    <h3 className='my-5 text-[18px] font-semibold'>{step.title}</h3>
                    <p className='my-3'>{step.description}</p>
                </div>
            ))}

            <h3 className='my-5 text-[18px] font-semibold'>Conclusion:</h3>
            <p className='my-3'>{data.conclusion}</p>
            <div className='my-24'>
                <p className='text-black font font-semibold my-4'>Share this article on social media</p>
                <div className='flex'>
                    <Image src={assets.facebook_icon} width={50} alt='' />
                    <Image src={assets.twitter_icon} width={50} alt='' />
                    <Image src={assets.googleplus_icon} width={50} alt='' />

                </div>

            </div>

        </div>
        <Footer />
    </> 
   
};

export default page;