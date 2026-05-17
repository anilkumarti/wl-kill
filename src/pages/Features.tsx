import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '🥗',
    title: 'Food Logging',
    description:
      'Track every meal with our extensive food database. Log calories, macros, and meal types in seconds.',
    link: '/foods',
  },
  {
    icon: '🏋️',
    title: 'Exercise Library',
    description:
      'Browse hundreds of exercises with step-by-step instructions and tips to perfect your form.',
    link: '/exercises',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description:
      'Visualize your weight loss, calorie trends, and workout streaks with beautiful charts.',
    link: '/progress',
  },
  {
    icon: '⚖️',
    title: 'BMI Calculator',
    description:
      'Calculate your Body Mass Index instantly and understand what it means for your health.',
    link: '/bmi-calculator',
  },
  {
    icon: '⏱️',
    title: 'Exercise Timer',
    description:
      'Use our built-in countdown timer to time your sets, rests, and HIIT intervals with ease.',
    link: '/exercise-timer',
  },
  {
    icon: '⭐',
    title: 'Favorite Meals',
    description:
      'Save your go-to meals for one-click logging so tracking never slows you down.',
    link: '/favorites',
  },
  {
    icon: '🤖',
    title: 'AI Nutrition Assistant',
    description:
      'Ask Gemini AI for personalized fitness tips, meal ideas, and calorie estimates — anytime.',
    link: '/',
  },
  {
    icon: '📈',
    title: 'Dashboard Overview',
    description:
      "Get a bird's-eye view of your daily calories, macros, water intake, and workout streak.",
    link: '/dashboard',
  },
];

const Features: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-4"
        >
          Everything You Need to Reach Your Goals
        </motion.h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          WL-Killer brings together all the tools you need to build healthier habits and stay on track.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={f.link}
              className="block h-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/signup"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Get Started for Free
        </Link>
      </div>
    </div>
  );
};

export default Features;
