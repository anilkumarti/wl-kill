import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4"
      >
        Your Fitness Journey Starts Here
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
      >
        Track your calories, monitor your progress, and achieve your fitness goals with Fat Kill. The ultimate tool for a healthier lifestyle.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/signup"
          className="bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
        >
          Get Started for Free
        </Link>
        <Link
          to="/features"
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          Learn More
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;