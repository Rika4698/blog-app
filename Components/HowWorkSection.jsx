import React from 'react';

const HowWorkSection = () => {
    return  (
        <div>
            <div className="bg-white p-4 min-h-screen mt-8">
                <div className="max-w-6xl mx-auto h-max px-6 md:px-12 xl:px-6">
                    <div className="text-center ">
                      
                        <h2 className="my-4 text-3xl font-bold text-black md:text-4xl">How does it work?</h2>
                        <p className="text-gray-600">You follow our process to get you started as quickly as possible</p>
                    </div>

                    <div className="mt-16 grid divide-x-2 divide-y-2 divide-gray-700 hover:divide-gray-500 overflow-hidden rounded-3xl border-2 text-gray-600 border-gray-700 hover:border-gray-500  sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4 group">
                        {/* 1. Initial Discussion */}
                        <div className="group relative bg-white group-hover:bg-gray-700 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[50px] h-[50px] text-black transition-colors duration-300 group-hover:text-white"
  >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1-2.184 0l-6.75-4.27a2.225 2.225 0 0 1-1.158-1.948v-7.285c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
                                    <path d="M10 10l2 -2v8" />
                                </svg>
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-black group-hover:text-white">Get Started with an Account</h5>
                                    <p className="text-gray-500 group-hover:text-gray-300">Click the “Get Started” button at the top to create your free account. This allows you to join the platform and unlock blog content. Without an account, you won’t be able to read full blog posts.

</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Deal Finalized */}
                        <div className="group relative bg-white group-hover:bg-gray-700 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                 <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[50px] h-[50px] text-black transition-colors duration-300 group-hover:text-white"
  >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1-2.184 0l-6.75-4.27a2.225 2.225 0 0 1-1.158-1.948v-7.285c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
                                    <path d="M10 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3" />
                                </svg>
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-black group-hover:text-white">Write and Publish Your Own Blogs</h5>
                                    <p className="text-gray-500 group-hover:text-gray-300">Want to share your thoughts? Once logged in, you can write and publish your own blog posts. Our editor helps you write effectively and beautifully, with support for AI-generated titles, description and conclusion .</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Product Delivery */}
                        <div className="group relative bg-white group-hover:bg-gray-700 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[50px] h-[50px] text-black transition-colors duration-300 group-hover:text-white"
  >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1-2.184 0l-6.75-4.27a2.225 2.225 0 0 1-1.158-1.948v-7.285c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
                                    <path d="M10 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1" />
                                </svg>
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-black group-hover:text-white">Subscribe to Read Blogs</h5>
                                    <p className="text-gray-500 group-hover:text-gray-300">To view other user blog, you must subscribe by entering your email. Once subscribed, you can read full blogs across categories like Technology, Startup, and Lifestyle.</p>
                                </div>
                            </div>
                        </div>

                        {/* 4. Celebrate Launch */}
                        <div className="group relative bg-white group-hover:bg-gray-700 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                 <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[50px] h-[50px] text-black transition-colors duration-300 group-hover:text-white"
  >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1-2.184 0l-6.75-4.27a2.225 2.225 0 0 1-1.158-1.948v-7.285c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
                                    <path d="M10 8v3a1 1 0 0 0 1 1h3" />
                                    <path d="M14 8v8" />
                                </svg>
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-black group-hover:text-white">Author Control</h5>
                                    <p className="text-gray-500 group-hover:text-gray-300">Blog authors have the ability to delete subscriber emails anytime from their dashboard to ensure privacy or manage their audience.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowWorkSection;