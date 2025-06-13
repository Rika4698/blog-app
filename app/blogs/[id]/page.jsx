'use client'
import { assets } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';




const page = () => {
   const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Redirect to login if user is unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      const currentPath = window.location.pathname;
      router.push(`/login?callbackUrl=${currentPath}`);
      
    }
  }, [status, router]);

  // Fetch blog data after session is authenticated
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/blog', {
          params: { id },
        });
        setData(response.data);
      } catch (err) {
        setError('Blog not found or error loading blog.');
      }
    };

    if (status === 'authenticated' && id) {
      fetchData();
    }
  }, [status, id]);

  if (status === 'loading' || (status === 'authenticated' && !data && !error)) {
    return <div className="text-center py-20 text-lg">Loading blog...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }


    return  <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href={'/'}>
                    <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' /> </Link>
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'>Get Started <Image src={assets.arrow} alt='' /></button>
            </div>
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>
                    {data.title}

                </h1>
                <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt='' />
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>

        </div>
        <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
            <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='' />
            <h1 className='my-8 text-[26px] font-semibold '>Introduction:</h1>
            <p>{data.description}</p>

            {data.steps.map((step, index) => (
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