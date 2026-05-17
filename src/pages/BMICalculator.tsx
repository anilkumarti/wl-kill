import React from 'react';
import { Link } from 'react-router-dom';

const BMICalculator: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
    <h1 className="text-4xl font-bold mb-4">BMI Calculator</h1>
    <p className="text-gray-600 dark:text-gray-300 mb-6">BMI calculator functionality will be built here.</p>
    <Link to="/" className="text-purple-600 hover:underline">
      Back to Home
    </Link>
  </div>
);

export default BMICalculator;
