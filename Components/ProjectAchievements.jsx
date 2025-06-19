'use client';

import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { title: 'Total Users', count: 120, suffix: "+", icon: '👤', color: 'bg-blue-100' },
  { title: 'Blog Posts', count: 12, suffix: "+", icon: '📝', color: 'bg-yellow-100' },
  { title: 'Subscribers', count: 20, suffix: "+", icon: '📬', color: 'bg-green-100' },
];

const ProjectAchievements = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-16 px-4 md:px-8 bg-white mt-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Our Milestones Journey 
        </h2>
        <p className="text-gray-600 mb-12">
          Celebrating growth, creativity, and the power of community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative flex flex-col items-center p-6 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl group"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 flex items-center justify-center text-3xl rounded-full mb-4 ${stat.color}`}
              >
                {stat.icon}
              </div>

              {/* Count */}
              <h3 className="text-4xl font-bold text-black mb-2">
                {inView && <CountUp end={stat.count} duration={3} suffix={stat.suffix}/>}
              </h3>

              {/* Label */}
              <p className="text-gray-500 font-medium">{stat.title}</p>

              {/* Snake-like animated border */}
              <span className="snake-border"></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectAchievements;
