import React from 'react';

const UpcomingCatagory = () => {
    return (
        <div>
            <section className="p-4">
  <h2 className="mb-10  font-semibold text-gray-900 text-2xl text-center mt-6 animate-pulse">
   --- Upcoming Blog Category ---
  </h2>

  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 xl:px-28 py-10">
  {[
    { icon: '💼', title: 'Business', label: 'Business category' },
    { icon: '🛠️', title: 'Software Developer', label: 'Developer' },
    { icon: '📣', title: 'Marketing', label: 'Marketing category' },
    { icon: '🎓', title: 'Education', label: 'Education category' },
    { icon: '📊', title: 'Data Analysis', label: 'Data Analysis category' },
    { icon: '🎨', title: 'Design', label: 'Design category' },
  ].map((item, index) => (
    <li
      key={index}
      className="bg-white border-2 border-gray-100 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-black"
    >
      <div className="flex items-center gap-4 px-6 py-5">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-green-50 text-3xl transition duration-300 group-hover:bg-green-100">
          <span role="img" aria-label={item.label}>
            {item.icon}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 hover:text-black transition-colors">
            {item.title}
          </h3>
        </div>
      </div>
    </li>
  ))}
</ul>

 
</section>
            
            
        </div>
    );
};

export default UpcomingCatagory;