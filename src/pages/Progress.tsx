import React from 'react';
import { Link } from 'react-router-dom';

const Progress: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
    <h1 className="text-4xl font-bold mb-4">Progress</h1>
    <p className="text-gray-600 dark:text-gray-300 mb-6">Progress tracking will be added here.</p>
    <Link to="/dashboard" className="text-purple-600 hover:underline">
      Back to Dashboard
    </Link>
  </div>
);

export default Progress;
