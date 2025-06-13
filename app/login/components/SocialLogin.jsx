"use client"
import React from 'react';
import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
const SocialLogin = () => {

     const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
   const handleGoogleLogin = () => {
    signIn('google', { callbackUrl }); 
    toast.success("Google Login Successfully");
  };

 const handleGithubLogin = () => {
    signIn('github', { callbackUrl }); 
    toast.success("Github Login Successfully");
  };

    return (
        <div>
            <h2 className='text-center my-4'>or, <span className='font-bold text-blue-800 text-lg'>Login With</span></h2>
            <div
            id="third-party-auth"
            className="flex items-center justify-center gap-3"
          >
            <button
              title='Google'
              onClick={handleGoogleLogin}
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1 cursor-pointer"
            >
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                alt="Google"
              />
            </button>
           
            <button
              title='Github'
           onClick={handleGithubLogin}
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1 cursor-pointer"
            >
              <img
                className="max-w-[25px] filter dark:invert"
                src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                alt="Github"
              />
            </button>
           
        
          </div>
        </div>
    );
};

export default SocialLogin;