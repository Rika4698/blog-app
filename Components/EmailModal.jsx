'use client';
import React, { useState } from 'react';
import { useSubscribeMutation } from '../store/subscriptionAPI';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import {X} from "lucide-react";
const EmailModal = ({ isOpen, onClose, onSuccess, blogData }) => {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [subscribe] = useSubscribeMutation();
  const [loading, setLoading] = useState(false);

  if (!isOpen || !blogData) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await subscribe({
        blogId: blogData._id,
        blogTitle: blogData.title,
        blogAuthorEmail: blogData.authorEmail,
        blogAuthorImg: blogData.authorImg,
        subscriberEmail: email,
        subscriberImg: session?.user?.image || '', // or custom image
      }).unwrap();

      toast.success(res.message || 'Subscribed successfully');
      onSuccess();
    } catch (error) {
      toast.error(error?.data?.error || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-3">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative border ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500  mr-2 mt-1"
        >
          <X size={22} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Subscribe to view this blog</h2>
        {/* <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!session}
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Subscribe & Continue'}
          </button>
        </form> */}
        <form onSubmit={handleSubmit} className='flex -mx-10 sm:mx-auto justify-between max-w-[500px] scale-75 sm:scale-95 sm:my-8  border border-black shadow-[-7px_7px_0px_#000000] ' action="">

             <input  onChange={(e) => setEmail(e.target.value)}
             value={email} type="email" placeholder='Enter your email' disabled={!session} className='pl-4 outline-none' required />
            
                <button type="submit" className='border-l border-black py-4 px-4  sm:px-8 active:bg-gray-600 active:text-white' disabled={loading}>{loading ? 'Subscribing...' : 'Subscribe'}</button>

            </form>
      </div>
    </div>
  );
};

export default EmailModal;
