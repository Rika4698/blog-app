'use client'
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem';
import axios from 'axios';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import { useGetSubscriptionsQuery,
  useDeleteSubscriptionMutation } from '../../../store/subscriptionAPI';

const page = () => {
 const { data: session } = useSession();
  const userEmail = session?.user?.email;
      const { data, error, isLoading } = useGetSubscriptionsQuery(
    userEmail ? { blogAuthorEmail: userEmail } : {}, 
  );

  const [deleteSubscription] = useDeleteSubscriptionMutation();

  if (isLoading) return <p className='text-center mt-10'>Loading blogs subscribe....</p>;
  if (error) return <p className='text-center text-red-500'>Failed to load blogs subscribe</p>;

  // ✅ Safe handling of response
  const blogs = Array.isArray(data) ? data : data?.blogs || [];
  
          console.log('data',blogs);
    

     const  deleteConfirm = (mongoId) => {
            toast(
              ({ closeToast }) => (
                <div>
                  <p className="font-semibold">Are you sure you want to delete this subscriber?</p>
                  <div className="flex gap-4 mt-3">
                    <button
                      className="bg-red-600 text-white px-4 py-1 rounded"
                      onClick={() => deleteEmail(mongoId, closeToast)}
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

    const deleteEmail = async (mongoId, closeToast) =>{
      try {
                  const res = await deleteSubscription(mongoId).unwrap();
                  toast.success(res.msg || "subscriber deleted successfully");
                } catch (error) {
                  toast.error("Failed to delete this email.");
                } finally {
                  closeToast();
                }
    };


   
     
    return (
      <div>
        <h2 className='text-center text-2xl font-semibold'>My Blogs Subscription</h2>

        {blogs.length === 0 ? <h2 className="text-center text-xl text-gray-500 mt-20">No Blog Subscribe.</h2>:<>
        
        <div className='flex-1 pt-10 px-5  sm:pl-12'>
            <h1>All Subscription: {blogs.length}</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            Email Subscription

                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Blog Title

                        </th>
                        <th scope='col' className=' px-6 py-3'>
                            Date

                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Action

                        </th>
                    </tr>

                    </thead>
                    <tbody>
                        {blogs.map((item,index)=>{
                            return <SubsTableItem key={index} mongoId={item._id} blogTitle={item.blogTitle} subscriberEmail={item.subscriberEmail} subscriberImg={item.subscriberImg} date={item.date} deleteConfirm={deleteConfirm}/> 
                        })}
                       
                    </tbody>

                </table>

            </div>
            
        </div></>} </div>
    );
};

export default page;