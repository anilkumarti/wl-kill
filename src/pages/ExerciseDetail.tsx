import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ExerciseDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Exercise Detail</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Details for exercise ID: {id || 'unknown'}.</p>
      <Link to="/exercises" className="text-purple-600 hover:underline">
        Back to Exercises
      </Link>
    </div>
  );
};

export default ExerciseDetail;
