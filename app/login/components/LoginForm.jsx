"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { loginUser } from '@/app/auth/loginUser';
import { signIn } from 'next-auth/react';
import SocialLogin from './SocialLogin';
import { useSearchParams } from "next/navigation";
const LoginForm = () => {
    // const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
  const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl
    });

    if (res.ok) {
      toast.success("Login successful");
      // router.push("/");
    } else {
      toast.error("Invalid email or password");
    }
    setLoading(false);
  };

    return (
        <div  className="flex font-poppins items-center justify-center mt-20 mx-auto my-auto">
           
    <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900 ">
    <div className="grid gap-8 mt-10">
      <div
        id="back-div"
        className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4 "
      >
        <div
          className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2"
        >
          <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
            Sign in
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2  dark:text-gray-400 text-lg">Email</label>
              <input
                
                className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                value={formData.email}
        required
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">Password</label>
              <input
                
                className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                value={formData.password}
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
               
              />
            </div>
           
            <button 
            type="submit"
            disabled={loading}
              className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              
            >
             {loading ? "Logging in..." : "LOG IN"} 
            </button>
          </form>
          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="dark:text-gray-300">
              Don't have an account? 
              <Link
                className="group text-blue-600 transition-all duration-100 ease-in-out ml-2"
                href="/register"
              >
                <span
                  className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                   Sign Up
                </span>
              </Link>
            </h3>
          </div>
          {error && <p className="text-red-500">Login failed: {error}</p>}
          <SocialLogin></SocialLogin>

          
        </div>
      </div>
      </div>
    </div>

        </div>
    );
};

export default LoginForm;