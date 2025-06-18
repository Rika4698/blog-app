import React from 'react';

const UpcomingCatagory = () => {
    return (
        <div>
            <section className="p-4">
  <h2 className="mb-10  font-semibold text-gray-900 text-2xl text-center mt-6 animate-pulse">
   --- Upcoming Blog Category ---
  </h2>

  <ul className="flex flex-wrap  justify-around gap-3 gap-y-10 mb-16 xl:mx-24  ">
    
    <li
        className="block h-full transition-all duration-200 bg-white border border-gray-200 rounded group hover:shadow-lg hover:border-black hover:ring-1 hover:ring-gray-700/20">
        <div className="flex items-center p-6">
          <div
            className="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-green-50 group-hover:bg-green-100">
            <span className="text-4xl" role="img" aria-label="Business category">💼</span>
          </div>

          <div className="flex-grow ml-6">
            <h3
              className="text-lg font-semibold text-gray-600 transition-colors duration-200 line-clamp-1 group-hover:text-gray-900">
              Business
            </h3>

           
          </div>

        </div>
      
    </li>
  
    <li
        className="block h-full transition-all duration-200 bg-white border border-gray-200 rounded group hover:shadow-lg hover:border-black hover:ring-1 hover:ring-gray-700/20">
        <div className="flex items-center p-6">
          <div
            className="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-green-50 group-hover:bg-green-100">
            <span className="text-4xl" role="img" aria-label="Developer ">🛠️</span>
          </div>

          <div className="flex-grow ml-6">
            <h3
              className="text-lg font-semibold text-gray-600 transition-colors duration-200 line-clamp-1 group-hover:text-gray-900">
             Software Developer
            </h3>

            
          </div>

          
        </div>
    
    </li>
    <li
        className="block h-full transition-all duration-200 bg-white border border-gray-200 rounded group hover:shadow-lg hover:border-black hover:ring-1 hover:ring-gray-700/20">
        <div className="flex items-center p-6">
          <div
            className="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-green-50 group-hover:bg-green-100">
            <span className="text-4xl" role="img" aria-label="Marketing category">📣</span>
          </div>

          <div className="flex-grow ml-6">
            <h3
              className="text-lg font-semibold text-gray-600 transition-colors duration-200 line-clamp-1 group-hover:text-gray-900">
              Marketing
            </h3>

            
          </div>

        
        </div>
      
    </li>


    <li
        className="block h-full transition-all duration-200 bg-white border border-gray-200 rounded group hover:shadow-lg hover:border-black hover:ring-1 hover:ring-gray-700/20">
        <div className="flex items-center p-6">
          <div
            className="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-green-50 group-hover:bg-green-100">
            <span className="text-4xl" role="img" aria-label="Education category">🎓</span>
          </div>

          <div className="flex-grow ml-6">
            <h3
              className="text-lg font-semibold text-gray-600 transition-colors duration-200 line-clamp-1 group-hover:text-gray-900">
              Education
            </h3>

           
          </div>

         
        </div>
    
    </li>
   
    <li
        className="block h-full transition-all duration-200 bg-white border border-gray-200 rounded group hover:shadow-lg hover:border-black hover:ring-1 hover:ring-gray-700/20">
        <div className="flex items-center p-6">
          <div
            className="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-green-50 group-hover:bg-green-100">
            <span className="text-4xl" role="img" aria-label="Data Analysis category">📊</span>
          </div>

          <div className="flex-grow ml-6">
            <h3
              className="text-lg font-semibold text-gray-600 transition-colors duration-200 line-clamp-1 group-hover:text-gray-900">
              Data Analysis
            </h3>

            
          </div>

          
        </div>
      
    </li>


    <li
        className="block h-full transition-all duration-200 bg-white border border-gray-200 rounded group hover:shadow-lg hover:border-black hover:ring-1 hover:ring-gray-700/20">
        <div className="flex items-center p-6">
          <div
            className="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-green-50 group-hover:bg-green-100">
            <span className="text-4xl" role="img" aria-label="Design category">🎨</span>
          </div>

          <div className="flex-grow ml-6">
            <h3
              className="text-lg font-semibold text-gray-600 transition-colors duration-200 line-clamp-1 group-hover:text-gray-900">
              Design
            </h3>
          </div>
        </div>
      
    </li>
   
   
   
  </ul>

 
</section>
            
            
        </div>
    );
};

export default UpcomingCatagory;