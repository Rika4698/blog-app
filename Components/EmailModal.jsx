'use client';
import React, { useState } from 'react';
import { useSubscribeMutation } from '../store/subscriptionAPI';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const EmailModal = ({ isOpen, onClose, onSuccess, blogData }) => {
  const { data: session } = useSession();
  const [email, setEmail] = useState(session?.user?.email || '');
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
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Subscribe to view this blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
