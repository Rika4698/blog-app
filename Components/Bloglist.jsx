'use client';
import React, {  useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import { useGetBlogsQuery } from '../store/blogAPI';
import Link from 'next/link';
import{ArrowRight} from 'lucide-react';

const Bloglist = ({searchQuery}) => {
    const { data, error, isLoading } = useGetBlogsQuery();
  const blogs = data?.blogs || [];

  const [menu, setMenu] = useState('All');
  const [filtered, setFiltered] = useState([]);

  const filterBlog = (text) => {
    if (!blogs) return;

    const lowerText = text.toLowerCase().trim();

    // Filter based on text (title/category) and selected menu
    const filteredBlogs = blogs.filter((blog) => {
      const matchesText =
        blog.title.toLowerCase().includes(lowerText) ||
        blog.category.toLowerCase().includes(lowerText);

      const matchesCategory = menu === 'All' || blog.category === menu;

      return matchesText && matchesCategory;
    });

    setFiltered(filteredBlogs);
  };

  useEffect(() => {
    if (!isLoading && blogs.length > 0) {
      filterBlog(searchQuery);
    }
  }, [searchQuery, blogs, isLoading, menu]);

  if (isLoading) return <p className="text-center mt-10">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load blogs</p>;
    // const fetchBlogs = async () =>{
    //     const response = await axios.get('/api/blog');
    //     setBlogs(response.data.blogs);
    //     console.log(response.data.blogs);
    // }
   
    // useEffect(() =>{
    //     fetchBlogs();
    // },[])

    return (
        <div>
           <div className="flex justify-center gap-3 sm:gap-6  my-10 text-base sm:text-lg">
        {['All', 'Technology', 'Startup', 'Lifestyle'].map((cate) => (
          <button
            key={cate}
            onClick={() => setMenu(cate)}
            className={` rounded-sm transition-all duration-300 ease-in-out cursor-pointer ${
        menu === cate
          ? 'bg-black text-white py-1 px-2 sm:px-4'
          : 'py-1 px-2 sm:px-4 bg-white text-black hover:bg-black hover:text-white'
      }`}
    >
            {cate}
          </button>
        ))}
      </div>

            <div className="flex flex-wrap justify-around gap-3 gap-y-10 mb-16 xl:mx-20 min-h-[300px] transition-all duration-300">
        {filtered.length > 0 ? (
          filtered
            .filter((item) => (menu === 'All' ? true : item.category === menu))
            .slice(0, searchQuery.trim() ? filtered.length : 4)
            .map((item, index) => (
              <BlogItem
                key={index}
                id={item._id}
                image={item.image}
                title={item.title}
                description={item.description}
                category={item.category}
                authorEmail={item.userEmail}
                authorImg={item.userImage}
              />
            ))
        ) : (
          <p className="text-center text-gray-600 w-full">No blogs found.</p>
        )}
      </div>

            <div className="text-center flex justify-center items-center my-12">
        <Link href="/allBlogs" className="text-black text-lg flex gap-2">
          <h3 className='font-semibold'>See All Blogs</h3> <ArrowRight size={25} className='mt-0.5'/>
        </Link>
      </div>

        </div>
    );
};

export default Bloglist;