Hamburger Menu for Mobile
      <div className="lg:hidden bg-slate-100 p-4  flex justify-between items-center">
        <Image src={assets.logo} width={120} alt='' />
        <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />
      </div>

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full min-h-screen  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`lg:flex flex-col bg-slate-100 lg:border border-black transition-all duration-300 
        ${isOpen ? "block" : "hidden"} lg:block w-full lg:w-80  lg:min-h-screen overflow-y-auto`}>
        
        <div className="max-lg:hidden lg:pl-14 lg:py-4 lg:border-b lg:border-black">
          <Image src={assets.logo} width={120} alt='' />
        </div>

        <div className="flex flex-col space-y-5 p-4 max-lg:mx-9">
          <Link href='/' onClick={() => setIsOpen(false)} className='flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'>
            <Home width={24} /><p>Home</p>
          </Link>
          <Link href='/admin/addProduct' onClick={() => setIsOpen(false)} className='flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'>
            <Image src={assets.add_icon} alt='' width={24} /><p>Add Blogs</p>
          </Link>
          <Link href='/admin/blogList' onClick={() => setIsOpen(false)} className='flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'>
            <Image src={assets.blog_icon} alt='' width={24} /><p>Blog Lists</p>
          </Link>
          <Link href='/admin/subscription' onClick={() => setIsOpen(false)} className='flex items-center justify-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[-7px] hover:translate-y-[7px] transition-all'>
            <Image src={assets.email_icon} alt='' width={24} /><p>Subscriptions</p>
          </Link>
        </div>
      </div>






 'use client';

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import CountUp from 'react-countup';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useGetBlogsQuery} from '@/store/blogAPI';
import { useGetSubscriptionsQuery } from '@/store/subscriptionAPI';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);


const page = () => {
    const [inView, setInView] = useState(false);
  const { data: blogsData, isLoading: blogsLoading, isError: blogsError } = useGetBlogsQuery();
  const { data: subscriptionsData, isLoading: subsLoading, isError: subsError } = useGetSubscriptionsQuery();

  useEffect(() => {
    setInView(true);
  }, []);

  if (blogsLoading || subsLoading) return <p className="text-center mt-10">Loading...</p>;
  if (blogsError || subsError) return <p className="text-center mt-10 text-red-500">Failed to load dashboard data.</p>;

  const blogsArray = Array.isArray(blogsData) ? blogsData : blogsData?.blogs || [];
const subscribersArray = Array.isArray(subscriptionsData) ? subscriptionsData : subscriptionsData?.subscribers || [];

// Count totals
const totalBlogs = blogsArray.length;
const totalSubscribers = subscribersArray.length;
const totalViews = subscribersArray.length;

// Generate chart data (date-wise blog count)
 const blogCategoryChartData = blogsArray.reduce((acc, blog) => {
    const createdAt = blog.date || blog.createdAt;
    if (!createdAt) return acc;

    const dateObj = new Date(createdAt);
    if (isNaN(dateObj)) return acc;

    const date = dateObj.toISOString().slice(0, 10); // 'YYYY-MM-DD'
    const category = blog.category || 'Uncategorized';

    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.total++;
      existing.categories[category] = (existing.categories[category] || 0) + 1;
    } else {
      acc.push({
        date,
        total: 1,
        categories: { [category]: 1 },
      });
    }

    return acc;
  }, []);

  // ✅ Total category-wise counts
  const totalCategoryCount = blogsArray.reduce((acc, blog) => {
    const category = blog.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // ✅ Chart Data
  const chartData = {
    labels: blogCategoryChartData.map(item => item.date),
    datasets: [
      {
        label: 'Blog Updates',
        data: blogCategoryChartData.map(item => item.total),
        fill: false,
        borderColor: '#8b5cf6',
        backgroundColor: '#8b5cf6',
        tension: 0.4,
      },
    ],
  };

  // ✅ Chart Options with category tooltips
  const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        title: (context) => `📅 ${context[0].label}`, // use backticks for template literal
        label: (context) => {
          const index = context.dataIndex;
          const data = blogCategoryChartData[index];
          const lines = Object.entries(data.categories).map(
            ([category, count]) => `${category}: ${count} blog${count > 1 ? 's' : ''}`
          );
          return lines;
        },
      },
    },
  },
};



  const stats = [
    { title: 'Total Blogs', value: totalBlogs, icon: '📝', color: 'bg-purple-100' },
    { title: 'Total Subscribers', value: totalSubscribers, icon: '📬', color: 'bg-green-100' },
    { title: 'Total Views', value: totalViews, icon: '👁️', color: 'bg-yellow-100' },
  ];

  return (
    <section className=" bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Welcome To Blogger Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
            >
              <div
                className={`absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 border-2 border-purple-500 animate-[border-glow_1s_linear_infinite]`}
              ></div>
              <div className={`relative z-10 flex items-center gap-4`}>
                <div
                  className={`text-3xl p-4 rounded-full ${stat.color} shadow-inner`}
                >
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {inView && <CountUp end={stat.value} duration={2}  />}
                  </h3>
                  <p className="text-gray-500 font-medium">{stat.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
       
       <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Category based blog:</h2>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
  {Object.entries(totalCategoryCount).map(([category, count], idx) => (
    <div
      key={idx}
      className="relative group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
    >
      <div
        className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 border-2 border-purple-500 animate-[border-glow_1s_linear_infinite]"
      ></div>
      <div className="relative z-10 flex items-center gap-4">
        <div className="text-3xl p-4 rounded-full bg-purple-100 shadow-inner text-purple-800">
          🗂️
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            {inView && <CountUp end={count} duration={2}  />}
          </h3>
          <p className="text-gray-500 font-medium">{category} blogs</p>
        </div>
      </div>
    </div>
  ))}
</div>
</div>

        

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📈 Blog Activity Over Time</h2>
           <div className="overflow-x-auto">
            <div className="min-w-[600px] lg:min-w-[900px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>
    );
}; 
export default page;
