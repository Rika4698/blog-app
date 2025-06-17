'use client'
import { assets, blog_data } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { useGetSubscriptionsQuery } from '@/store/subscriptionAPI';
import EmailModal from './EmailModal';
import { useRouter } from 'next/navigation';



const BlogItem = ({title,category, image, description,id, authorEmail, authorImg}) => {
    const { data: session, status } = useSession();
   const userEmail = session?.user?.email;

    const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [checkingSub, setCheckingSub] = useState(false);

  const { data: subscriptions, refetch } = useGetSubscriptionsQuery(
    id && userEmail ? { blogId: id, subscriberEmail: userEmail } : skipToken,
    {
      skip: !id || !userEmail,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
    }
  );

 const handleReadMore = async () => {
  if (status === 'loading') return;

  if (!session) {
    router.push(`/login?callbackUrl=/blogs/${id}`);
    return;
  }

  // ✅ Author shouldn't need to subscribe
  if (userEmail === authorEmail) {
    router.push(`/blogs/${id}`);
    return;
  }

  setCheckingSub(true);

  try {
    const result = await refetch();
    if (result?.data?.length > 0) {
      router.push(`/blogs/${id}`);
    } else {
      setModalOpen(true);
    }
  } catch (err) {
    console.error(err);
    setModalOpen(true);
  } finally {
    setCheckingSub(false);
  }
};

  const handleModalSuccess = () => {
    setModalOpen(false);
    router.push(`/blogs/${id}`);
  };


    return (
        <>
           <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]'>
        <Image src={image} alt={title} width={400} height={400} className='border-b border-black' />
        <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
        <div className='p-5'>
          <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
          <p className='mb-3 text-sm tracking-tight text-gray-700'>
            {description?.slice(0, 120)}...
          </p>

          <button
            onClick={handleReadMore}
            disabled={checkingSub}
            className='inline-flex items-center py-2 font-semibold text-center text-black hover:text-gray-800'
          >
            {checkingSub ? 'Checking...' : 'Read more'}
            <Image src={assets.arrow} className='ml-2' alt='' width={12} />
          </button>
        </div>
      </div>

      <EmailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleModalSuccess}
        blogData={{
          _id: id,
          title,
          authorEmail,
          authorImg,
        }}
      />
            
       
        </>
    );
};

export default BlogItem;