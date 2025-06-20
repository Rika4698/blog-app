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
import { useGetBlogsQuery } from '@/store/blogAPI';
import { useGetSubscriptionsQuery } from '@/store/subscriptionAPI';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const Dashboard = () => {
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

  const totalBlogs = blogsArray.length;
  const totalSubscribers = subscribersArray.length;
  const totalViews = subscribersArray.length;

  const blogCategoryChartData = blogsArray.reduce((acc, blog) => {
    const createdAt = blog.date || blog.createdAt;
    if (!createdAt) return acc;

    const date = new Date(createdAt).toISOString().slice(0, 10);
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

  const totalCategoryCount = blogsArray.reduce((acc, blog) => {
    const category = blog.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: blogCategoryChartData.map(item => item.date),
    datasets: [
      {
        label: 'Blog Updates',
        data: blogCategoryChartData.map(item => item.total),
        fill: false,
        borderColor: '#485ff4',
        backgroundColor: '#485ff4',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => `📅 ${context[0].label}`,
          label: (context) => {
            const index = context.dataIndex;
            const data = blogCategoryChartData[index];
            return Object.entries(data.categories).map(
              ([cat, count]) => `${cat}: ${count} blog${count > 1 ? 's' : ''}`
            );
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
    <section className="bg-gray-50 p-4 ">
      <div className="max-w-3xl lg:max-w-xl xl:max-w-4xl mx-auto ">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Welcome To Blogger Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="relative group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300">
              <div className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 border-2 border-black animate-[border-glow_1s_linear_infinite]"></div>
              <div className="relative z-10 flex justify-center items-center gap-4">
                <div className={`text-3xl p-4 rounded-full ${stat.color} shadow-inner`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {inView && <CountUp end={stat.value} duration={2} />}
                  </h3>
                  <p className="text-gray-500 font-medium">{stat.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Category based blog:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(totalCategoryCount).map(([category, count], idx) => (
              <div key={idx} className="relative group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300">
                <div className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-all duration-500 border-2 border-black animate-[border-glow_1s_linear_infinite]"></div>
                <div className="relative z-10 flex justify-center items-center gap-4">
                  <div className="text-3xl p-4 rounded-full bg-purple-100 text-purple-800 shadow-inner">🗂️</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{inView && <CountUp end={count} duration={2} />}</h3>
                    <p className="text-gray-500 font-medium">{category} blogs</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md overflow-x-auto ">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📈 Blog Activity Over Time</h2>
          <div className="min-w-[600px] lg:min-w-[800px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
